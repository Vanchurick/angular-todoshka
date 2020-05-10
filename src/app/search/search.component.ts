import { Component, OnInit } from '@angular/core';
import { ToDosService } from '../services/toDos/to-dos.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(private toDoService: ToDosService) { }


  search: string;

  ngOnInit(): void {
  }


  onSearch({ target: { value } }) {
    this.toDoService.searchToDo(value)
  }
}
