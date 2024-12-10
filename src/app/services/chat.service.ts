import { Injectable} from '@angular/core';
import { Apollo} from 'apollo-angular';
import { map, Observable,} from 'rxjs'
import { gql } from 'apollo-angular';
import { HttpClient } from '@angular/common/http';
import { MessageRequest } from '../entities/requests/message.request';
import { StompService } from '../config/stomp/stomp.service';
import { MessageResponse } from '../entities/responses/message.response';
import {SessionService} from "./session.service";


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  headers!: {
    'Authorization': string
  }

    constructor(
        private apollo: Apollo,
        private http: HttpClient,
        private session: SessionService,
        private stomp: StompService
    ) {
      this.headers = {
        'Authorization': session.getToken()? `Bearer ${session.getToken()}` : ''
      }
    }


    sendMessage(message: MessageRequest){
        this.stomp.publish({
          destination: `/api/chat/message/add`,
          body: JSON.stringify(message),
          headers: this.headers })
    }

    createDirectMessage(message: MessageRequest){

    }

    messageListenerInit(){
        return this.stomp.watch(`/topic/chats/messages`, this.headers).pipe(
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
