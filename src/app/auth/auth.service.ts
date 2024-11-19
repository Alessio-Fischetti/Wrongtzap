import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SessionService } from '../services/session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private session: SessionService
  ) { }

  register(registerJson: {userName: string, userMail: string, userPassword: string}){ 
    return this.http.post(`${environment.apiUrl}/auth/register`, registerJson) 
  }
  
  login(login: {userMail: string, userPassword: string}): Observable<any>{ 
    return this.http.post(`${environment.apiUrl}/auth/login`, login).pipe(
      tap((resolve)=> {
        const token = resolve as {jwt: string}
        this.session.saveToken(token.jwt)
      })
    )
  }

}
