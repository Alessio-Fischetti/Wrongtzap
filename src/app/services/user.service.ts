import { Injectable} from '@angular/core';
import { Apollo} from 'apollo-angular';
import {firstValueFrom, map, Observable,} from 'rxjs'
import { gql } from 'apollo-angular';
import { HttpClient } from '@angular/common/http';
import { StompService } from '../config/stomp/stomp.service';
import {SessionService} from "./session.service";
import {environment} from "../config/environments/environment";
import {Profile} from "../entities/models/profile";
import {Friend} from "../entities/models/friend";
import {friendFragment, pagedChat, pagedGroup, pagedMessages} from "../config/graph/graph.fragments";


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

  sendFriendRequest(request: {senderId: string, receiverId: string}){
    this.stomp.publish({
      destination: `/api/user/friend/send/request`,
      body: JSON.stringify(request),
      headers: this.headers
    })
  }

  acceptFriendRequest(request: {friendshipId: string, senderId: string, receiverId: string}){
    this.stomp.publish({
      destination: `/api/user/friend/accept/request`,
      body: JSON.stringify(request),
      headers: this.headers
    })
  }


  rejectFriendRequest(request: {friendshipId: string, senderId: string, receiverId: string}){
    this.stomp.publish({
      destination: `/api/user/friend/reject/request`,
      body: JSON.stringify(request),
      headers: this.headers
    })
  }

  editUsername(
    request: {
      userId: String,
      description: string | null,
      username: string | null
    }){
    this.stomp.publish({
      destination: `/api/user/edit/username`,
      body: JSON.stringify(request),
      headers: this.headers
    })
  }

  ProfileListenerInit(userId: string){
    return this.stomp.watch(`/topic/users/${userId}/profile`, this.headers).pipe(
      map((event) => {
        return JSON.parse(event.body) as Profile | undefined
      })
    )
  }

  friendListenerInit(userId: string){
    return this.stomp.watch(`/topic/users/${userId}/friends`, this.headers).pipe(
      map((event) => {
        const converted = JSON.parse(event.body) as Friend | undefined
        if(converted){
          converted.image = ''
        }
        return converted
      })
    )
  }

  retrieveUser(userId: string): Observable<any> {
    const USER_QUERY = gql`
      ${pagedChat}
      ${pagedGroup}
      ${friendFragment}
      query ($userId: String!) {
        user(userId: $userId) {
          userId
          username
          chats{
            ...ChatFragment
          }
          groups{
            ...GroupFragment
          }
          friends {
            ...FriendFragment
          }
        }
      }`;

    return this.apollo.query({
      query: USER_QUERY,
      variables: { userId },
      fetchPolicy: 'network-only',
    });
  }


}
