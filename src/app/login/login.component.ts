import { Component } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { Router } from '@angular/router';
import { ToDosService } from '../services/toDos/to-dos.service';
import { errorHandler } from '../helpers/errorHandler';
import { loginResponse, signUpResponse } from '../interfaces/toDo'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {

  constructor(private userService: UserService, private router: Router, private toDoService: ToDosService) { }

  login: string = 'Ivan';
  password: string = '12345';
  serverError: boolean;



  loginUser() {
    this.userService.login(this.login, this.password).subscribe({
      next: (response: loginResponse) => {

        const { userInfo: { id, login, toDoList } } = response;

        this.userService.saveUserData(login, id);

        this.toDoService.saveToDoList(toDoList)
      },
      error: (msg) => {

        this.serverError = true;
        errorHandler(msg);
        localStorage.setItem('login', "false")

      }, complete: this.onComplete.bind(this)
    })


  }

  signUpUser() {
    this.userService.auth(this.login, this.password).subscribe({
      next: (response: signUpResponse) => {

        console.log(response);

        const { newUser: { id, login } } = response;

        this.userService.saveUserData(login, id);

      },
      error: (msg) => {

        this.serverError = true;

        errorHandler(msg);

      }, complete: this.onComplete.bind(this)
    })

  }

  onComplete() {

    this.router.navigate(['main']);

    this.clearLoginAndPassword();

  }


  clearLoginAndPassword() {
    this.login = "";
    this.password = "";
  }

}
