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

  /**
   * Initializes the component by fetching the list of TODOS from the service.
   */
  ngOnInit(): void {
    this.todoService.getTodos().subscribe( response => {
      this.todos = response;
    })
  }

   /**
   * Opens a confirmation modal and marks all ToDo items as completed if confirmed.
   */
  onClickAllCompleted(): void {
    this.dialogRef  = this.dialog.open(ConfirmModalComponent);
    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.todoService.markAllAsCompleted();
      }
    });
  }

   /**
   * Opens a confirmation modal and deletes all ToDo items if confirmed.
   */
  onClickAllDelete(): void {
    this.dialogRef  = this.dialog.open(ConfirmModalComponent);
    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.todoService.deleteAllTodos();
      }
    });
  }
}
