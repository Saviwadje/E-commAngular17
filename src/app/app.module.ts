import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
   
  ],
  imports: [
    AppModule,
    BrowserModule,
   // AppRoutingModule,
    FormsModule,
    HttpClientModule,
   // FontAwesomeModule,
    NgModule,
    
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
