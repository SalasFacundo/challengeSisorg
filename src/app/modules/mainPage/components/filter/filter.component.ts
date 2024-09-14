import { Component } from '@angular/core';
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

  selectedOption: string = '';

  public Status = Status;
  public Priority = Priority;

  onFilterChange(option: string): void{
    this.selectedOption =  option;
  }

  sortByDate(): void{
    this.todoService.sortByDate();
  }

  sortByPriority(): void{
    this.todoService.sortByPriority();
  }

  filterByStatus(status: Status): void{
    this.todoService.filterByStatus(status);
  }

  filterByPriority(priority: Priority){
    this.todoService.filterByPriority(priority);
  }

  resetFilters(): void{
    this.todoService.resetFilters();
  }
}
