import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private session: SessionService
  ) { }

  register(registerJson: {userName: string, userMail: string, userPassword: string}){ 
    return this.http.post(`${environment.apiUrl}/noauth/register`, registerJson) 
  }
  
  login(login: {userMail: string, userPassword: string}): Observable<any>{ 
    return this.http.post(`${environment.apiUrl}/noauth/login`, login).pipe(
      tap((response)=> {
        const jwt = response as {token: string}
        this.session.saveToken(jwt.token)
      })
    )
  }

}
