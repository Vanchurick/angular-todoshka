import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { UserService } from '../user/user.service'
import shortid from 'shortid';



import toDoInterface from '../../interfaces/toDo'

@Injectable({
  providedIn: 'root'
})

export class ToDosService {

  constructor(private http: HttpClient) { }

  toDoList = JSON.parse(localStorage.getItem('toDos')) || [];



  saveToDoList(list) {
    this.toDoList = list;
    this.saveToLocalStorage(this.toDoList);

  }

  addNewToDo(task) {
    this.toDoList.push({ ...task, completed: false, id: shortid.generate() })
    this.saveToLocalStorage(this.toDoList);
    console.log(this.toDoList)
  }

  saveToLocalStorage(list) {
    localStorage.setItem('toDos', JSON.stringify(list))
  }



  removeToDo(arr: toDoInterface[], id: number) {
    return arr.filter(el => el.id !== id);
  }

  editTodo(arr: toDoInterface[], id: number, title: string) {
    return arr.map(el => {
      if (el.id === id) {
        el.title = title;
        return el;
      }
      return el;
    })
  }

  searchToDo(arr: toDoInterface[], search: string) {

    return arr.filter(el => {
      let elemTitle = el.title.split(' ').join().toLowerCase();
      let searchRequest = search.split(' ').join().toLowerCase();

      if (elemTitle.includes(searchRequest)) {
        return el;
      }
    });


  }

  filterToDo(arr: toDoInterface[], param: string) {
    const params = {
      completed: true,
      uncompleted: false,
    }

    if (param === "all") {
      return arr;
    }

    return arr.filter(el => el.completed === params[param])
  }

}
