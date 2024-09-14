import { Component, OnInit } from '@angular/core';
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

  openDialog() {
    const dialogRef = this.dialog.open(AddEditModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.todoService.addTodo(result);
    });
  }
}

