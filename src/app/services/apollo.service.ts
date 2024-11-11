import { Injectable } from '@angular/core';
import { Apollo, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { ApolloLink, InMemoryCache, ApolloClientOptions } from '@apollo/client/core';
import { environment } from 'src/environments/environment';
import { setContext } from '@apollo/client/link/context';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class ApolloService {
  constructor(
    private apollo: Apollo,
    private httpLink: HttpLink,
    private sessionService: SessionService
  ) {}

  configureApollo() {
    const auth = setContext((_, { headers }) => {
      const token = this.sessionService.getToken();
      return {
        headers: {
          ...headers,
          Authorization: token ? `Bearer ${token}` : ''
        }
      };
    });

    const link = ApolloLink.from([
      auth,
      this.httpLink.create({ uri: `${environment.apiUrl}/graphql` }) 
    ]);

    const apolloClientConfig: ApolloClientOptions<any> = {
      link,
      cache: new InMemoryCache(),
    };

    this.apollo.create(apolloClientConfig);
  }
}