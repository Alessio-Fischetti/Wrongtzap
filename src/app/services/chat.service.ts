import { Injectable} from '@angular/core';
import { Apollo} from 'apollo-angular';
import { map, Observable,} from 'rxjs'
import { gql } from 'apollo-angular';
import { HttpClient } from '@angular/common/http';
import { MessageRequest } from '../entities/requests/message.request';
import { StompService } from '../config/stomp/stomp.service';
import { MessageResponse } from '../entities/responses/message.response';
import {SessionService} from "./session.service";
import {ChatResponse} from "../entities/responses/chat.response";
import {Group} from "../entities/models/group";
import {GroupResponse} from "../entities/responses/group.response";
import {PagedChatResponse} from "../entities/responses/paged/paged.chat.response";
import {PagedGroupResponse} from "../entities/responses/paged/paged.group.response";


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

  pageChatListener(userId: string){
    return this.stomp.watch(`/topic/${userId}/pages/chats`, this.headers).pipe(
      map((event) => {
        return JSON.parse(event.body) as PagedChatResponse | undefined
      })
    )
  }

  pageGroupListener(userId: string){
    return this.stomp.watch(`/topic/${userId}/pages/groups`, this.headers).pipe(
      map((event) => {
        return JSON.parse(event.body) as PagedGroupResponse | undefined
      })
    )
  }


    chatListener(){
      return this.stomp.watch(`/topic/chats`, this.headers).pipe(
        map((event) => {
          return JSON.parse(event.body) as ChatResponse | undefined
        })
      )
    }

    groupListener(){
      return this.stomp.watch(`/topic/groups`, this.headers).pipe(
        map((event) => {
          return JSON.parse(event.body) as GroupResponse | undefined
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
