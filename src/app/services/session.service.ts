import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { interval, Observable, Subscription, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Profile } from '../models/profile';
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

  saveProfile(){
    const token = this.getToken()
    if(token){
    this.http.post(`${environment.apiUrl}/auth/profile`, this.wrapToken(token)).subscribe({
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

  getProfile(): Profile{
    const username = sessionStorage.getItem("username")
    const userId = sessionStorage.getItem("userid")
    if(username && userId) 
      return new Profile(username,userId)
    else 
      return new Profile('','')
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
    return this.http.post(`${environment.apiUrl}/auth/refresh`, this.wrapToken(token)).pipe(
      tap((resolve) => {
        let data = resolve as {jwt:string}
        if(this.getToken() != data.jwt){
          this.saveToken(data.jwt)
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
    return {jwt: token}
  }
}
