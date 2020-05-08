import { Component } from '@angular/core';
import { UserService } from '../services/user/user.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private userService: UserService) { }

  login: string = "Ivan";
  password: string = "12345";

  clearLoginAndPassword() {
    this.login = "";
    this.password = "";
  }

  loginUser() {
    this.userService.login(this.login, this.password).subscribe(data => console.log(data))
    this.clearLoginAndPassword()
  }

  signUpUser() {
    this.clearLoginAndPassword()
  }


}
