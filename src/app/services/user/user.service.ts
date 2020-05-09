import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  loginUser: string;
  userId: string;


  auth(login: string, password: string) {
    const body = { login, password };
    return this.http.post('http://localhost:5050/api/auth', body);
  }



  login(login: string, password: string) {
    const body = { login, password };
    return this.http.post('http://localhost:5050/api/login', body);
  }

  saveUserData(login: string, id: string) {
    this.loginUser = login;
    this.userId = id;
  }

  getUserData() {
    return { login: this.loginUser, id: this.userId }
  }
}
