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

  /**
   * Retrieves todos from local storage.
   * @returns An array of ToDo items retrieved from local storage.
   */
  private getTodosFromLocalStorage(): ToDo[] {
    const todosData = localStorage.getItem(this.storageKey);
    return todosData ? JSON.parse(todosData) : [];
  }

   /**
   * Saves todos to local storage and updates the BehaviorSubject to get data in real time.
   * @param todos The array of ToDo items to be saved.
   */
  private saveTodosToLocalStorage(todos: ToDo[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(todos));
    this.todosSubject.next(todos);
  }

  /**
   * Gets the observable stream of todos.
   * @returns An observable of the array of ToDo items.
   */
  getTodos(): Observable<ToDo[]> {
    return this.todosSubject.asObservable();
  }

  /**
   * Retrieves a ToDo item by its ID.
   * @param id The ID of the ToDo item to retrieve.
   * @returns The ToDo item with the specified ID or undefined if not found.
   */
  getTodoById(id: number): ToDo | undefined {
    const todos = this.todosSubject.getValue();
    return todos.find(todo => todo.id === id);
  }

  /**
   * Adds a new ToDo item.
   * @param newTodo The new ToDo item to add.
   */
  addTodo(newTodo: ToDo): void {
    const todos = this.todosSubject.getValue();
    newTodo.id = todos.length ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
    todos.push(newTodo);
    this.saveTodosToLocalStorage(todos);
  }

  /**
   * Updates an existing ToDo item.
   * @param updatedTodo The ToDo item with updated values.
   */
  updateTodo(updatedTodo: ToDo): void {
    const todos = this.todosSubject.getValue();
    const index = todos.findIndex(todo => todo.id === updatedTodo.id);
    if (index !== -1) {
      todos[index] = updatedTodo;
      this.saveTodosToLocalStorage(todos);
    }
  }

  /**
   * Deletes a ToDo item by its ID.
   * @param id The ID of the ToDo item to delete.
   */
  deleteTodo(id: number): void {
    const todos = this.todosSubject.getValue();
    const updatedTodos = todos.filter(todo => todo.id !== id);
    this.saveTodosToLocalStorage(updatedTodos);
  }

  /**
   * Filters todos by their status and updates the BehaviorSubject.
   * @param status The status to filter by.
   */
  filterByStatus(status: Status): void {
    const todos = this.getTodosFromLocalStorage();
    const filteredTodos = todos.filter(todo => todo.status === status);
    this.todosSubject.next(filteredTodos);
  }

  /**
   * Filters todos by their priority and updates the BehaviorSubject.
   * @param priority The priority to filter by.
   */
  filterByPriority(priority: Priority): void {
    const todos = this.getTodosFromLocalStorage();
    const filteredTodos = todos.filter(todo => todo.priority === priority);
    this.todosSubject.next(filteredTodos);
  }

  /**
   * Sorts todos by their date and updates the BehaviorSubject.
   */
  sortByDate(): void {
    const todos = this.getTodosFromLocalStorage();
    const sortedTodos = todos.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    this.todosSubject.next(sortedTodos);
  }

  /**
   * Sorts todos by their priority and updates the BehaviorSubject.
   */
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

  /**
   * Resets all filters and updates the BehaviorSubject with the original todos.
   */
  resetFilters(): void {
    const todos = this.getTodosFromLocalStorage();
    this.todosSubject.next(todos);
  }

  /**
   * Marks all ToDo items as completed and updates the local storage.
   */
  markAllAsCompleted(): void {
    const todos = this.getTodosFromLocalStorage();
    const updatedTodos = todos.map(todo => ({
      ...todo,
      status: Status.COMPLETED
    }));
    this.saveTodosToLocalStorage(updatedTodos);
  }

  /**
   * Deletes all ToDo items and clears the local storage.
   */
  deleteAllTodos(): void {
    this.saveTodosToLocalStorage([]);
  }
}
