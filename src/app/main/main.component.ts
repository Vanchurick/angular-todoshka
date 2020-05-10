import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent implements OnInit {

  constructor(private router: Router) { }


  ngOnInit(): void {
    const isLogin = localStorage.getItem('login');
    if (!JSON.parse(isLogin)) {
      this.router.navigate(['login']);
    }
  }

  editMode: boolean = false
  idTaskForEditing;


  activeEditMode(id) {
    this.idTaskForEditing = id;
    this.editMode = true;
  }

  deactivEditMode(e) {
    this.editMode = e;
  }

}
