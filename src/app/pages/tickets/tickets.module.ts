import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TicketsComponent} from "./containers/tickets/tickets.component";
import {SelectButtonModule} from "primeng/selectbutton";
import {PlayedTicketsModule} from "../played-tickets/played-tickets.module";
import {InputNumberModule} from "primeng/inputnumber";
import {TicketsStore} from "../../services/tickets-store";

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
    PlayedTicketsModule,
    InputNumberModule
  ],
  providers: [
    TicketsStore
  ]
})
export class TicketsModule { }
