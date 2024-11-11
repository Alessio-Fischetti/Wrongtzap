import { Injectable, Inject } from '@angular/core';
import { Apollo} from 'apollo-angular';
import { Observable } from 'rxjs'
import { gql } from 'apollo-angular';
import { ApolloService } from './apollo.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
    

    constructor(
        private apolloService: ApolloService,
        private apollo: Apollo
    ) {
        this.apolloService.configureApollo()
    }

    retrieveEveryChat(): Observable<any>{
    const EVERY_CHAT_QUERY = gql`
        query {
            everyChat {
                name
                participants{
                    userId
                    username
                    email
                }
                messages{
                    sender
                    content
                    timestamp
                }
                isGroup
            }
        }`

        return this.apollo.query({
            query: EVERY_CHAT_QUERY,
            fetchPolicy: 'network-only'
        })
    }
}