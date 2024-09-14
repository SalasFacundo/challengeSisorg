import { SelectionModel } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ToDo } from '../../models/todo';
import { Priority } from '../../enums/priority';
import { Status } from '../../enums/status';


const ELEMENT_DATA: ToDo[] = [
  {id: 1, title: 'Compras', description: 'Hacer las compras', status: Status.COMPLETED, priority: Priority.HIGH ,date: new Date()}
];

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent {

}
