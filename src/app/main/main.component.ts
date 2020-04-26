import { Component } from '@angular/core';
import toDoInterface from '../interfaces/toDo';
import { ToDosService } from '../services/toDos/to-dos.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  constructor(private toDoService: ToDosService) {
    this.toDoService.requestToDo().subscribe(data => {
      this.toDos = data;
      this.copyToDos = data;
    })
  }


  toDoTitle: string = "";
  toDos: toDoInterface[];
  copyToDos: toDoInterface[];
  editingMode: boolean = false;
  idToDoForEditing: number;


  saveToDo() {

    if (!this.toDoTitle.length) {
      alert('Enter the title of the task')
      return
    }

    this.toDos = this.toDoService.addNewToDo(this.toDos, this.toDoTitle);
    this.toDoTitle = ""
  }


  deleteToDo(id) {
    this.toDos = this.toDoService.removeToDo(this.toDos, Number(id));
  }

  startToEdit(id, title) {
    this.editingMode = true;
    this.toDoTitle = title;
    this.idToDoForEditing = Number(id);
  }

  saveChangesOfEditing() {
    this.toDoService.editTodo(this.toDos, this.idToDoForEditing, this.toDoTitle)
    this.toDoTitle = "";
    this.editingMode = false;
  }

  searchToDo({ target: { value } }) {
    this.toDos = this.toDoService.searchToDo(this.copyToDos, value)
  }

  onFilterChange({ target: { value } }) {
    this.toDos = this.toDoService.filterToDo(this.copyToDos, value)
  }

}
