import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { UserService } from '../user/user.service'
import shortid from 'shortid';



@Injectable({
  providedIn: 'root'
})

export class ToDosService {

  constructor(private http: HttpClient) { this.createDatesFilters() }

  toDoList = JSON.parse(localStorage.getItem('toDos')) || [];
  copyToDoList = JSON.parse(localStorage.getItem('toDos')) || [];
  dateFilters = [];

  saveToDoList(list) {
    this.toDoList = list;
    this.copyToDoList = this.toDoList;

    this.createDatesFilters()
    this.saveToLocalStorage(this.toDoList);

  }

  saveToLocalStorage(list) {
    localStorage.setItem('toDos', JSON.stringify(list))
  }



  getToDos() {
    return this.toDoList;
  }

  getTask(id) {
    return this.toDoList.find(toDo => toDo.id === id)
  }


  addNewToDo(title, deadline) {
    const newTask = {
      title,
      deadline: Date.parse(deadline),
      completed: false,
      id: shortid.generate(),
      createdDate: Date.now(),
    }

    this.toDoList.push(newTask)
    this.copyToDoList = this.toDoList;
    this.createDatesFilters()
    this.saveToLocalStorage(this.toDoList);
  }




  removeToDo(id) {
    this.toDoList = this.toDoList.filter(toDo => toDo.id !== id);
    this.copyToDoList = this.toDoList;
    this.createDatesFilters()
    this.saveToLocalStorage(this.toDoList);
  }

  editTodo(id, title, deadline) {
    this.toDoList.map(el => {
      if (el.id === id) {
        el.title = title;
        el.deadline = Date.parse(deadline);
        return el;
      }
      return el;
    })

    this.copyToDoList = this.toDoList;
    this.createDatesFilters()
    this.saveToLocalStorage(this.toDoList);
  }

  searchToDo(search) {

    this.toDoList = this.copyToDoList.filter(el => {
      let elemTitle = el.title.split(' ').join().toLowerCase();
      let searchRequest = search.split(' ').join().toLowerCase();

      if (elemTitle.includes(searchRequest)) {
        return el;
      }
    });

  }

  filterToDo(value) {

    const params = {
      completed: true,
      uncompleted: false,
    }

    if (value === "all") {
      this.toDoList = this.copyToDoList;
      return;
    }

    this.toDoList = this.copyToDoList.filter(el => el.completed === params[value])
  }


  saveAllChanges() {
    this.saveToLocalStorage(this.toDoList);
  }


  createDatesFilters() {

    const allDates = this.toDoList.map(toDo => {

      const date = new Date(toDo.deadline);

      return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
    });


    const filters = [];

    for (let str of allDates) {
      if (!filters.includes(str)) {
        filters.push(str);
      }
    }

    this.dateFilters = [...filters]


  }


  getDateFilters() {
    return this.dateFilters;
  }

}
