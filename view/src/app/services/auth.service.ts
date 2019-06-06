import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {map} from 'rxjs/operators';
import { User } from '../models/user';
declare var require: any;

@Injectable()
export class AuthService {
  constructor(private http: HttpClient, public router: Router) { }

  login(username: string, password: string) {
    const loginData = { username: username, password: password };
    return this.http.post<any>('/api/users/login', loginData).pipe(map((loginRespond: any) => {
      loginRespond.username = username;
      if (loginRespond && loginRespond.token) {
        loginRespond.userData = loginRespond.token;
        localStorage.setItem('currentUser', JSON.stringify(loginRespond));
    } return loginRespond;
    }));
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

}
