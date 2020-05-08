import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  login(login: string, password: string) {


    const body = { login, password };
    return this.http.post('http://localhost:5050/api/login', body);
  }
}
