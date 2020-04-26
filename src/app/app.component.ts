import { Component, OnInit } from '@angular/core';
import { ToDosService } from './services/toDos/to-dos.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'todo';

  constructor(private toDoService: ToDosService) { }

  ngOnInit() {

    this.toDoService.requestToDo();

  }
}
