import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayedTicketsComponent } from './containers/played-tickets/played-tickets.component';



@NgModule({
  declarations: [
    PlayedTicketsComponent
  ],
  exports: [
    PlayedTicketsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PlayedTicketsModule { }
