import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditModalComponent } from '../../components/modals/add-edit-modal/add-edit-modal.component';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'grid-page',
  templateUrl: './grid-page.component.html',
  styleUrl: './grid-page.component.scss'
})
export class GridPageComponent{

  constructor(private dialog: MatDialog, private todoService: TodoService){}

  /**
 * Opens a dialog for adding a new ToDo item.
 * The dialog is initialized with the mode set to 'add'.
 * After the dialog is closed, the result (new ToDo item) is passed to the TodoService to be added.
 */
  openDialog() {
    const dialogRef  = this.dialog.open(AddEditModalComponent, {
      data: { mode: 'add'}});

    dialogRef.afterClosed().subscribe(result => {
      this.todoService.addTodo(result);
    });
  }
}

