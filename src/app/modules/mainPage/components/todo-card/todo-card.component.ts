import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmModalComponent } from '../modals/confirm-modal/confirm-modal.component';
import { ToDo } from '../../models/todo';
import { Status } from '../../enums/status';
import { TodoService } from '../../services/todo.service';
import { AddEditModalComponent } from '../modals/add-edit-modal/add-edit-modal.component';

@Component({
  selector: 'todo-card',
  templateUrl: './todo-card.component.html',
  styleUrl: './todo-card.component.scss'
})
export class TodoCardComponent {

  @Input() data!: ToDo;
  public Status = Status;
  dialogRefDelete!: MatDialogRef<ConfirmModalComponent>
  dialogRefEdit!: MatDialogRef<AddEditModalComponent>

  constructor(private dialog: MatDialog, private todoService: TodoService){}


  openConfirmModal(id: number): void {
    this.dialogRefDelete  = this.dialog.open(ConfirmModalComponent);

    this.dialogRefDelete.afterClosed().subscribe(result => {
      if (result) {
        this.todoService.deleteTodo(id)
      }
    });
  }

  openEditModal(id: number): void {
    this.dialogRefEdit  = this.dialog.open(AddEditModalComponent, {
      data: { mode: 'edit', todoId: id}});

    this.dialogRefEdit.afterClosed().subscribe(result => {
      if (result) {
        result.id = id;
        this.todoService.updateTodo(result);
      }
    });
  }
}
