import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private apiUrl = `${environment.apiUrl}/api`

  register(registerJson: {userName: string, userMail: string, userPassword: string}){ return this.http.post(`/api/noauth/register`, registerJson) }
  login(login: {userMail: string, userPassword: string}){ return this.http.post(`/api/noauth/login`, login) }

}
