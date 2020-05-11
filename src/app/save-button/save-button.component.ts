import { Component, OnInit } from '@angular/core';
import { ToDosService } from '../services/toDos/to-dos.service';


@Component({
  selector: 'app-save-button',
  templateUrl: './save-button.component.html',
  styleUrls: ['./save-button.component.scss']
})
export class SaveButtonComponent implements OnInit {

  constructor(private toDoService: ToDosService) { }

  ngOnInit(): void {
  }

  saveAll() {
    this.toDoService.saveAllChanges();
  }

}
