import { Component, ElementRef, ViewChild } from '@angular/core';
import { Status } from '../../enums/status';
import { TodoService } from '../../services/todo.service';
import { Priority } from '../../enums/priority';

@Component({
  selector: 'filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {

  constructor(private todoService: TodoService){}

  @ViewChild('statusRadio') statusRadio!: ElementRef<HTMLInputElement>;
  @ViewChild('priorityRadio') priorityRadio!: ElementRef<HTMLInputElement>;

  selectedOption: string = '';

  public Status = Status;
  public Priority = Priority;

  onFilterChange(option: string): void{
    this.selectedOption =  option;
  }

  sortByDate(): void{
    this.resetFilters();
    this.todoService.sortByDate();
  }

  sortByPriority(): void{
    this.resetFilters();
    this.todoService.sortByPriority();
  }

  filterByStatus(status: Status): void{
    this.todoService.filterByStatus(status);
  }

  filterByPriority(priority: Priority){
    this.todoService.filterByPriority(priority);
  }

  resetFilters(): void{
    if (this.statusRadio) {
      this.statusRadio.nativeElement.checked = false;
    }
    if (this.priorityRadio) {
      this.priorityRadio.nativeElement.checked = false;
    }
    this.todoService.resetFilters();
    this.selectedOption = '';
  }
}
