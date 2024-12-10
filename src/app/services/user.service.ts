import { Injectable} from '@angular/core';
import { Apollo} from 'apollo-angular';
import {firstValueFrom, map, Observable,} from 'rxjs'
import { gql } from 'apollo-angular';
import { HttpClient } from '@angular/common/http';
import { MessageRequest } from '../entities/requests/message.request';
import { StompService } from '../config/stomp/stomp.service';
import { MessageResponse } from '../entities/responses/message.response';
import {SessionService} from "./session.service";
import {UserResponse} from "../entities/responses/user.response";
import {environment} from "../config/environments/environment";


@Injectable({
  providedIn: 'root'
})
export class UserService {

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

  async searchUser(userId: string): Promise<Boolean> {
    try {
      await firstValueFrom(this.http.post(`${environment.apiUrl}/user/search`, {userId: userId}))
      return true
    } catch (err){
      return false
    }
  }

  addFriend(request: {senderId: string, receiverId: string}){
    this.stomp.publish({
      destination: `/api/user/friend/add`,
      body: JSON.stringify(request),
      headers: this.headers
    })
  }

  userListenerInit(userId: string){
    return this.stomp.watch(`/topic/users/${userId}`, this.headers).pipe(
      map((event) => {
        return JSON.parse(event.body) as UserResponse | undefined
      })
    )
  }

  retrieveUser(email: string): Observable<any> {
    const USER_QUERY = gql`
      query ($email: String!) {
        user(userId: $email) {
          userId
          username
          chats {
            chatId
            name
            participants {
              userId
              username
            }
            participantsDate{
              userId
              timestamp
            }
            messages {
              username
              userId
              content
              timestamp
            }
            isGroup
          }
          friends {
            userId
            username
          }
        }
      }`;

    return this.apollo.query({
      query: USER_QUERY,
      variables: { email },
      fetchPolicy: 'network-only',
    });
  }


}
