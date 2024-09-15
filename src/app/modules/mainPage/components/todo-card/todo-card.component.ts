import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmModalComponent } from '../modals/confirm-modal/confirm-modal.component';
import { ToDo } from '../../models/todo';
import { Status } from '../../enums/status';
import { TodoService } from '../../services/todo.service';
import { AddEditModalComponent } from '../modals/add-edit-modal/add-edit-modal.component';
import { Priority } from '../../enums/priority';

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

 /**
   * Opens a confirmation modal to delete a ToDo item.
   * @param id The ID of the ToDo item to delete.
   */
  openConfirmModal(id: number): void {
    this.dialogRefDelete  = this.dialog.open(ConfirmModalComponent);

    this.dialogRefDelete.afterClosed().subscribe(result => {
      if (result) {
        this.todoService.deleteTodo(id)
      }
    });
  }

  /**
   * Opens an edit modal to update a ToDo item.
   * @param id The ID of the ToDo item to edit.
   */
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

  /**
   * Gets the CSS class for the ToDo status.
   * @param status The status of the ToDo item.
   * @returns The CSS class associated with the given status.
   */
  getStatusClass(status: Status): string {
    switch (status) {
      case Status.NEW:
        return 'status-new';
      case Status.IN_PROGRESS:
        return 'status-inProgress';
      case Status.COMPLETED:
        return 'status-completed';
      default:
        return '';
    }
  }

  /**
   * Gets the CSS class for the ToDo priority.
   * @param priority The priority of the ToDo item.
   * @returns The CSS class associated with the given priority.
   */
  getPriorityClass(priority: Priority): string {
    switch (priority) {
      case Priority.LOW:
        return 'priority-low';
      case Priority.MEDIUM:
        return 'priority-medium';
      case Priority.HIGH:
        return 'priority-high';
      default:
        return '';
    }
  }
}
