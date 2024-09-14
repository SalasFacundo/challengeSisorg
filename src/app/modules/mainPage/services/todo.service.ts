import { Injectable } from '@angular/core';
import { ToDo } from '../models/todo';
import { BehaviorSubject, Observable } from 'rxjs';
import { Status } from '../enums/status';
import { Priority } from '../enums/priority';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private storageKey = 'todos';
  private todosSubject: BehaviorSubject<ToDo[]> = new BehaviorSubject<ToDo[]>(this.getTodosFromLocalStorage());

  constructor() {}

  private getTodosFromLocalStorage(): ToDo[] {
    const todosData = localStorage.getItem(this.storageKey);
    return todosData ? JSON.parse(todosData) : [];
  }

  private saveTodosToLocalStorage(todos: ToDo[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(todos));
    this.todosSubject.next(todos);
  }

  getTodos(): Observable<ToDo[]> {
    return this.todosSubject.asObservable();
  }

  getTodoById(id: number): ToDo | undefined {
    const todos = this.todosSubject.getValue();
    return todos.find(todo => todo.id === id);
  }

  addTodo(newTodo: ToDo): void {
    const todos = this.todosSubject.getValue();
    newTodo.id = todos.length ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
    todos.push(newTodo);
    this.saveTodosToLocalStorage(todos);
  }

  updateTodo(updatedTodo: ToDo): void {
    const todos = this.todosSubject.getValue();
    const index = todos.findIndex(todo => todo.id === updatedTodo.id);
    if (index !== -1) {
      todos[index] = updatedTodo;
      this.saveTodosToLocalStorage(todos);
    }
  }

  deleteTodo(id: number): void {
    const todos = this.todosSubject.getValue();
    const updatedTodos = todos.filter(todo => todo.id !== id);
    this.saveTodosToLocalStorage(updatedTodos);
  }

  filterByStatus(status: Status): void {
    const todos = this.getTodosFromLocalStorage();
    const filteredTodos = todos.filter(todo => todo.status === status);
    this.todosSubject.next(filteredTodos);
  }

  filterByPriority(priority: Priority): void {
    const todos = this.getTodosFromLocalStorage();
    const filteredTodos = todos.filter(todo => todo.priority === priority);
    this.todosSubject.next(filteredTodos);
  }

  sortByDate(): void {
    const todos = this.getTodosFromLocalStorage();
    const sortedTodos = todos.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    this.todosSubject.next(sortedTodos);
  }

  sortByPriority(): void {
    const todos = this.getTodosFromLocalStorage();
    const sortedTodos = todos.sort((a, b) => {
      const priorityOrder = {
        [Priority.HIGH]: 1,
        [Priority.MEDIUM]: 2,
        [Priority.LOW]: 3
      };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
    this.todosSubject.next(sortedTodos);
  }

  resetFilters(): void {
    const todos = this.getTodosFromLocalStorage();
    this.todosSubject.next(todos);
  }

  markAllAsCompleted(): void {
    const todos = this.getTodosFromLocalStorage();
    const updatedTodos = todos.map(todo => ({
      ...todo,
      status: Status.COMPLETED
    }));
    this.saveTodosToLocalStorage(updatedTodos);
  }

  deleteAllTodos(): void {
    this.saveTodosToLocalStorage([]);
  }
}
