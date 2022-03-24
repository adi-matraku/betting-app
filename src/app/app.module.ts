import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import {TicketsModule} from "./pages/tickets/tickets.module";
import {PlayedTicketsModule} from "./pages/played-tickets/played-tickets.module";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    TicketsModule,
    PlayedTicketsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
