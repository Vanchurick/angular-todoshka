import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ToDosService } from '../services/toDos/to-dos.service';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss']
})
export class ToDoListComponent implements OnInit {

  constructor(public toDoService: ToDosService) { }

  @Output() idTaskForEdit = new EventEmitter();


  ngOnInit(): void { }


  deleteTask(id) {
    this.toDoService.removeToDo(id);
  }

  startToEdit(id) {
    this.idTaskForEdit.emit(id)
  }


  compareDates(deadline) {
    const toDay = new Date(Date.now());
    const date = new Date(deadline);


    if (toDay.getDate() === date.getDate() && toDay.getMonth() === date.getMonth() && toDay.getFullYear() === date.getFullYear()) {
      return true
    }

    return false;

  }

}
