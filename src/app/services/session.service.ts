import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { interval, Observable, Subscription, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserDisplay } from '../models/userDisplay';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private http: HttpClient) {}

  sessionSubscription!: Subscription

  isAuthorized(): boolean{
    return !!sessionStorage.getItem("token")
  }

  saveDisplayData(){
    const token = this.getToken()
    if(token){
    this.http.post(`${environment.apiUrl}/session/user-display`, this.wrapToken(token)).subscribe({
      next : (response) => {
        const data = response as {username: string, userId: string}
        sessionStorage.setItem("username",data.username)
        sessionStorage.setItem("userid", data.userId)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
  }

  getDisplayData(): UserDisplay{
    const username = sessionStorage.getItem("username")
    const userId = sessionStorage.getItem("userid")
    if(username && userId) 
      return new UserDisplay(username,userId)
    else 
      return new UserDisplay('','')
  }

  saveToken(token: string){
    sessionStorage.setItem("token", token)
    sessionStorage.setItem("token-counter", "0")
  }

  getToken(){
    return sessionStorage.getItem("token")
  }

  increaseTokenRefreshCount(){
    const counter = sessionStorage.getItem("token-counter")
    if(counter)
      sessionStorage.setItem("token-counter", `${Number.parseInt(counter) + 1}`)
  }

  handleSession(){
    const token = this.getToken()
    if (token)
      this.sessionSubscription = interval(60 * 10 * 1000).pipe(
        switchMap(() => this.checkExpiration(token))
      ).subscribe()
    else
      console.log('token does not exist')
  }

  checkExpiration(token: string): Observable<any>{
    return this.http.post(`${environment.apiUrl}/session/check-expiration`, this.wrapToken(token)).pipe(
      tap((response) => {
        let jwt = response as {token: string}
        if(this.getToken() != jwt.token){
          this.saveToken(jwt.token)
          this.increaseTokenRefreshCount()
        }
      })
    ) 
  }

  stopSession(){
    if(this.sessionSubscription)
      this.sessionSubscription.unsubscribe()
  }

  wrapToken(token: string){
    return {token: token}
  }
}
