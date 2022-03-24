import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TicketsComponent} from "./containers/tickets/tickets.component";
import {SelectButtonModule} from "primeng/selectbutton";
import {PlayedTicketsModule} from "../played-tickets/played-tickets.module";

@NgModule({
  declarations: [
    TicketsComponent
  ],
  exports: [
    TicketsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SelectButtonModule,
    FormsModule,
    PlayedTicketsModule
  ]
})
export class TicketsModule { }
