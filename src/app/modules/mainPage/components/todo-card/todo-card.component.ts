import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmModalComponent } from '../modals/confirm-modal/confirm-modal.component';
import { ToDo } from '../../models/todo';
import { Status } from '../../enums/status';

@Component({
  selector: 'todo-card',
  templateUrl: './todo-card.component.html',
  styleUrl: './todo-card.component.scss'
})
export class TodoCardComponent {

  @Input() data!: ToDo;
  public Status = Status;

  constructor(private dialog: MatDialog){}


  openConfirmModal(): void {
    this.dialog.open(ConfirmModalComponent);
  }
}
