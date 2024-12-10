import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { authInterceptor } from './app/config/auth/auth.interceptor';
import { ApolloClientOptions, ApolloLink, InMemoryCache } from '@apollo/client';
import { HttpLink } from 'apollo-angular/http';
import { SessionService } from './app/services/session.service';
import { setContext } from '@apollo/client/link/context';
import { environment } from './app/config/environments/environment';
import { provideApollo } from 'apollo-angular';

import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { inject } from '@angular/core';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { StompService, stompServiceFactory } from './app/config/stomp/stomp.service';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: StompService, useFactory: stompServiceFactory },

    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideApollo(() => createApollo())
  ],
});

export function createApollo(): ApolloClientOptions<any> {

  const httpLink = inject(HttpLink);
  const sessionService = inject(SessionService);

  const http = httpLink.create({uri: `${environment.apiUrl}/graphql`})

  const auth = setContext((_, { headers }) => {
    const token = sessionService.getToken();
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : ''
      }
    };
  });


  const websocket = new GraphQLWsLink(
    createClient({
      url: `ws://${environment.apiUrl}/graphql`,
      connectionParams: () => ({
        Authorization: sessionService.getToken() ?
        `Bearer ${sessionService.getToken()}` : ''
        }),
      retryAttempts: 5,
      shouldRetry: () => true
    })
  )

  const link = ApolloLink.split(({query}) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  websocket,
  ApolloLink.from([auth,http])
  )

  return {
    link,
    cache: new InMemoryCache(),
  };
}
