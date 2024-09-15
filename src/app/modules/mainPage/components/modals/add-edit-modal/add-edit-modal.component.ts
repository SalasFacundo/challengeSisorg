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

  /**
   * Builds the form.
   */
  buildForm(): void {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
      priority: ['', Validators.required],
      date: ['', Validators.required],
    });
  }

  /**
   * Sets values in the form of selected task just if the modal was opened in edit mode.
   * @param todo The ToDo item to set in the form. If undefined, the form will remain empty.
   */
  setFormValues(todo: ToDo | undefined): void {
    this.taskForm.patchValue({
      title: todo?.title,
      description: todo?.description,
      status: todo?.status,
      priority: todo?.priority,
      date: todo?.date
    });
  }

  /**
   * Initializes variables and sets form values based on the modal mode.
   * - If the mode is 'edit', it fetches the ToDo item by ID and sets the form values.
   * - If the mode is 'add', it sets the title for adding a new ToDo item.
   */
  initVars(): void {
    if(this.data.mode == 'edit'){
      this.title = "Edit task";
      let todo = this.todoService.getTodoById(this.data.todoId);
      this.setFormValues(todo);
    } else if(this.data.mode=='add'){
      this.title = "Add task";
    }
  }

   /**
   * Closes the modal and passes the form value if the form is valid.
   */
  onSave(): void {
    if (this.taskForm.valid) {
      this.dialogRef.close(this.taskForm.value);
    }
  }

   /**
   * Closes the modal without passing any data.
   */
  onCancel(): void {
    this.dialogRef.close();
  }

}
