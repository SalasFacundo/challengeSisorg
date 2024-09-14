import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ToDo } from '../../models/todo';
import { Priority } from '../../enums/priority';
import { Status } from '../../enums/status';
import { TodoService } from '../../services/todo.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmModalComponent } from '../modals/confirm-modal/confirm-modal.component';
@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent implements OnInit {

  dialogRef!: MatDialogRef<ConfirmModalComponent>
  todos!: ToDo[];

  constructor( private todoService: TodoService, private dialog: MatDialog){}

  ngOnInit(): void {
    this.todoService.getTodos().subscribe( response => {
      this.todos = response;
    })
  }

  onClickAllCompleted(): void {
    this.dialogRef  = this.dialog.open(ConfirmModalComponent);
    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.todoService.markAllAsCompleted();
      }
    });
  }

  onClickAllDelete(): void {
    this.dialogRef  = this.dialog.open(ConfirmModalComponent);
    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.todoService.deleteAllTodos();
      }
    });
  }


}
