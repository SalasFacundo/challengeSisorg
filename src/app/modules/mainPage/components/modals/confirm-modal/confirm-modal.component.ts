import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.scss'
})
export class ConfirmModalComponent {

  constructor(public dialogRef: MatDialogRef<ConfirmModalComponent>) {}

   /**
   * Closes the modal without passing te option choosed, in this case NO.
   */
  onNoClick(){
    this.dialogRef.close(false);
  }

  /**
   * Closes the modal without passing te option choosed, in this case YES.
   */
  onYesClick(){
    this.dialogRef.close(true);
  }
}
