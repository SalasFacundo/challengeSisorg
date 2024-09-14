import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MainPageModule } from './modules/mainPage/main-page.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmModalComponent } from './modules/mainPage/components/modals/confirm-modal/confirm-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    ConfirmModalComponent
  ],
  imports: [
    BrowserModule,
    MainPageModule,
    BrowserAnimationsModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
