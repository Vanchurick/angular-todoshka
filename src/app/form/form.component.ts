import { Component, OnInit, Input } from '@angular/core';
import { ToDosService } from '../services/toDos/to-dos.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  constructor(private toDoService: ToDosService) { }


  taskTitle: string;
  taskDeadline: string;


  @Input() editMode: boolean;
  @Input() taskForEdit;


  ngOnInit(): void {
  }



  addNewTask() {
    if (!this.taskTitle || !this.taskDeadline) {
      alert('Empty fileds!');
      return;
    }

    this.toDoService.addNewToDo(this.taskTitle, this.taskDeadline);

    this.taskTitle = ""
    this.taskDeadline = ""

  }



  save() {
    this.toDoService.saveAllChanges()
  }



}
