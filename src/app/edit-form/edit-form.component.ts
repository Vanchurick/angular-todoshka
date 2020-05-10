import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToDosService } from '../services/toDos/to-dos.service';


@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss']
})
export class EditFormComponent implements OnInit {

  constructor(private toDoService: ToDosService) { }


  @Input() id;
  @Output() editingMode = new EventEmitter();


  ngOnInit(): void {

    const taskForEditing = this.toDoService.getTask(this.id)

    this.taskTitle = taskForEditing.title;
    this.taskDeadline = new Date(taskForEditing.deadline).toISOString();

  }

  taskTitle;
  taskDeadline;


  saveChanges() {
    this.toDoService.editTodo(this.id, this.taskTitle, this.taskDeadline)

    this.editingMode.emit(false)
  }

}
