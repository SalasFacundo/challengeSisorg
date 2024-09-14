import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Status } from '../../../enums/status';

@Component({
  selector: 'app-add-edit-modal',
  templateUrl: './add-edit-modal.component.html',
  styleUrl: './add-edit-modal.component.scss'
})
export class AddEditModalComponent {

  taskForm!: FormGroup;

  statusOptions = [Status.NEW, Status.IN_PROGRESS ,Status.COMPLETED];
  priorityOptions = ['low', 'medium', 'high'];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEditModalComponent>
  ) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
      priority: ['', Validators.required],
      date: ['', Validators.required],
    });
  }

  onSave() {
    if (this.taskForm.valid) {
      this.dialogRef.close(this.taskForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
