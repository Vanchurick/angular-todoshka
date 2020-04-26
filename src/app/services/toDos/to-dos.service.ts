import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { generate } from 'shortid';

import toDoInterface from '../../interfaces/toDo'

@Injectable({
  providedIn: 'root'
})

export class ToDosService {

  constructor(private http: HttpClient) { }



  requestToDo() {
    return this.http.get<toDoInterface[]>('https://jsonplaceholder.typicode.com/todos')
  }

  addNewToDo(arr: toDoInterface[], title: string): toDoInterface[] {
    const newToDo = {
      title,
      completed: false,
      id: Math.ceil(Math.random() * 100000),
      userId: 1505
    }

    arr.unshift(newToDo);

    return arr;
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
