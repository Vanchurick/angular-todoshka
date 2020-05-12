import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  login: string;

  ngOnInit(): void {
    const { login } = this.userService.getUserData();

    this.login = login || 'Ivan';
  }

  logout() {

    const isSaved = confirm('Have you saved changes?');

    if (!isSaved) {
      return;
    }

    this.userService.logOut();
    this.router.navigate(['login']);
  }

}
