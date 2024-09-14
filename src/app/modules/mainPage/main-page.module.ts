import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { GridPageComponent } from './pages/grid-page/grid-page.component';
import { MatIconModule } from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { TodoCardComponent } from './components/todo-card/todo-card.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatChipsModule} from '@angular/material/chips';
import {MatDividerModule} from '@angular/material/divider';
import { FilterComponent } from './components/filter/filter.component';


@NgModule({
  declarations: [
    TodoListComponent,
    GridPageComponent,
    TodoCardComponent,
    FilterComponent
  ],
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatChipsModule,
    MatDividerModule

  ],
  exports: [
    TodoListComponent,
    GridPageComponent,
    FilterComponent
  ]
})
export class MainPageModule { }
