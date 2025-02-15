import { Injectable} from '@angular/core';
import { Apollo} from 'apollo-angular';
import { map, Observable,} from 'rxjs'
import { gql } from 'apollo-angular';
import { HttpClient } from '@angular/common/http';
import { MessageRequest } from '../entities/requests/message.request';
import { StompService } from '../config/stomp/stomp.service';
import { MessageResponse } from '../entities/responses/message.response';
import {SessionService} from "./session.service";
import {DirectChatResponse} from "../entities/responses/direct.chat.response";
import {GroupChat} from "../entities/models/group.chat";
import {GroupChatResponse} from "../entities/responses/group.chat.response";


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
          destination: `/api/messages/add`,
          body: JSON.stringify(message),
          headers: this.headers })
    }

    createChat(request: {firstUserId: string, secondUserId: string}) {
      this.stomp.publish({
        destination: `/api/chats/create`,
        body: JSON.stringify(request),
        headers: this.headers
      })
    }


  createGroup(request: {name: string, adminId: string, userIds: string[]}) {
    this.stomp.publish({
      destination: `/api/groups/create`,
      body: JSON.stringify(request),
      headers: this.headers
    })
  }

    chatListener(){
      return this.stomp.watch(`/topic/chats`, this.headers).pipe(
        map((event) => {
          return JSON.parse(event.body) as DirectChatResponse | undefined
        })
      )
    }

    groupListener(){
      return this.stomp.watch(`/topic/groups`, this.headers).pipe(
        map((event) => {
          return JSON.parse(event.body) as GroupChatResponse | undefined
        })
      )
    }

    chatMessageListener(){
        return this.stomp.watch(`/topic/chats/messages`, this.headers).pipe(
            map((event) => {
                return JSON.parse(event.body) as MessageResponse | undefined
            })
        )
    }

    groupMessageListener(){
      return this.stomp.watch(`/topic/groups/messages`, this.headers).pipe(
        map((event) => {
          return JSON.parse(event.body) as MessageResponse | undefined
        })
      )
    }
}
