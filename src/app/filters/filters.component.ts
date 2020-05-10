import { Component, OnInit } from '@angular/core';
import { ToDosService } from '../services/toDos/to-dos.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  constructor(public toDoService: ToDosService) { }

  ngOnInit(): void {
  }

  onChange({ target: { value } }) {
    this.toDoService.filterToDo(value)
  }



}
