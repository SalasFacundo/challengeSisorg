import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ToDo } from '../../models/todo';
import { Priority } from '../../enums/priority';
import { Status } from '../../enums/status';
import { TodoService } from '../../services/todo.service';
@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent implements OnInit {

  todos!: ToDo[];

  constructor( private todoService: TodoService){}

  ngOnInit(): void {
    this.todoService.getTodos().subscribe( response => {
      this.todos = response;
    })
  }


}
