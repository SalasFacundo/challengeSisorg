import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Status } from '../../../enums/status';
import { TodoService } from '../../../services/todo.service';
import { ToDo } from '../../../models/todo';

@Component({
  selector: 'app-add-edit-modal',
  templateUrl: './add-edit-modal.component.html',
  styleUrl: './add-edit-modal.component.scss'
})
export class AddEditModalComponent {

  title: string= '';
  taskForm!: FormGroup;

  statusOptions = [Status.NEW, Status.IN_PROGRESS ,Status.COMPLETED];
  priorityOptions = ['low', 'medium', 'high'];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private todoService: TodoService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.initVars();
  }

  buildForm(): void {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
      priority: ['', Validators.required],
      date: ['', Validators.required],
    });
  }

  setFormValues(todo: ToDo | undefined): void {
    this.taskForm.patchValue({
      title: todo?.title,
      description: todo?.description,
      status: todo?.status,
      priority: todo?.priority,
      date: todo?.date
    });
  }

  initVars(): void {
    if(this.data.mode == 'edit'){
      this.title = "Edit TO-DO";
      let todo = this.todoService.getTodoById(this.data.todoId);
      this.setFormValues(todo);
    } else if(this.data.mode=='add'){
      this.title = "Add TO-DO";
    }
  }

  onSave(): void {
    if (this.taskForm.valid) {
      this.dialogRef.close(this.taskForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
