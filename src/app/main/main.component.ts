import { Component } from '@angular/core';
import toDoInterface from '../interfaces/toDo';
import { ToDosService } from '../services/toDos/to-dos.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent {

  constructor(private toDoService: ToDosService) { }



  toDos = this.toDoService.toDoList;
  editingMode: boolean = false;
  deadline: string;
  title: string;


  addTask() {

    if (!this.title || !this.deadline) {
      alert("Empty fileds!")
      return;
    }

    const newTask = {
      title: this.title,
      deadLine: Date.parse(this.deadline)
    }

    this.toDoService.addNewToDo(newTask);

    this.title = "";
    this.deadline = "";
  }






  // deleteToDo(id) {
  //   this.toDos = this.toDoService.removeToDo(this.toDos, Number(id));
  // }

  // startToEdit(id, title) {
  //   this.editingMode = true;
  //   this.toDoTitle = title;
  //   this.idToDoForEditing = Number(id);
  // }

  // saveChangesOfEditing() {
  //   this.toDoService.editTodo(this.toDos, this.idToDoForEditing, this.toDoTitle)
  //   this.toDoTitle = "";
  //   this.editingMode = false;
  // }

  // searchToDo({ target: { value } }) {
  //   this.toDos = this.toDoService.searchToDo(this.copyToDos, value)
  // }

  // onFilterChange({ target: { value } }) {
  //   this.toDos = this.toDoService.filterToDo(this.copyToDos, value)
  // }

}
