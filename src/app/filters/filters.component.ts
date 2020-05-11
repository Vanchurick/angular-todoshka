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

  onChangeComplete({ target: { value } }) {
    this.toDoService.filterToDoByComplete(value)
  }

  onChangeDate(date) {

    if (typeof date === 'object') {

      const { target: { value } } = date;

      this.toDoService.filterToDoByDate(value);
      return;
    }


    this.toDoService.filterToDoByDate(date)
  }

}
