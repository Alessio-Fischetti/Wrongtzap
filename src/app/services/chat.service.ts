import { Injectable} from '@angular/core';
import { Apollo} from 'apollo-angular';
import { map, Observable, tap } from 'rxjs'
import { gql } from 'apollo-angular';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MessageRequest } from '../requests/message.request';
import { StompService } from './stomp.service';
import { MessageResponse } from '../responses/message.response';
import { parse } from 'graphql';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
    
    constructor(
        private apollo: Apollo,
        private http: HttpClient,
        private stomp: StompService
    ) {}



    sendMessage(message: MessageRequest){
        this.stomp.publish({destination: `/api/chat/message/add`, body: JSON.stringify(message)})
    }

    messageListenerInit(){
        return this.stomp.watch(`/topic/chats/messages`).pipe(
            map((event) => {
                return JSON.parse(event.body) as MessageResponse | undefined
            })
        )
    }

    retrieveEveryChat(): Observable<any>{
    const EVERY_CHAT_QUERY = gql`
        query {
            everyChat {
                chatId
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