import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { UserService } from '../user/user.service'
import shortid from 'shortid';
import { errorHandler } from '../../helpers/errorHandler';




@Injectable({
  providedIn: 'root'
})

export class ToDosService {

  constructor(private http: HttpClient, private userService: UserService) { this.createDatesFilters() }

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
      creationDate: Date.now(),
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

  filterToDoByComplete(value) {
    const params = {
      completed: true,
      uncompleted: false,
    }

    if (value === "all") {
      this.toDoList = this.copyToDoList;
      return;
    }

    console.log(this.toDoList);
    console.log(this.copyToDoList)

    this.toDoList = this.copyToDoList.filter(el => el.completed === params[value])
  }

  filterToDoByDate(date) {

    if (date === "all") {
      this.toDoList = this.copyToDoList;
      return;
    }

    this.toDoList = this.copyToDoList.filter(el => new Date(el.deadline).toISOString() === new Date(date).toISOString())
  }

  saveAllChanges() {

    const { login, id } = this.userService.getUserData();

    const body = { id, login, tasks: [...this.toDoList] }

    console.log(body)

    this.http.post('http://localhost:5050/api/add', body).subscribe({
      next: (response) => {

        console.log(response);
      },
      error: (msg) => {

        errorHandler(msg);

      }, complete: () => {
        this.copyToDoList = this.toDoList;
        this.saveToLocalStorage(this.toDoList);
      }
    });

  }

  createDatesFilters() {
    const allDates = this.toDoList.map(toDo => {

      const date = new Date(toDo.deadline).toISOString();
      return date
    });

    const uniqDates = [];

    for (let str of allDates) {
      if (!uniqDates.includes(str)) {
        uniqDates.push(str);
      }
    }

    const formatedDates = uniqDates.map(date => Date.parse(date));

    this.dateFilters = [...formatedDates]
  }


  getDateFilters() {
    return this.dateFilters;
  }

}
