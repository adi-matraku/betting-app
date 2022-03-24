import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-played-tickets',
  templateUrl: './played-tickets.component.html',
  styleUrls: ['./played-tickets.component.scss']
})
export class PlayedTicketsComponent implements OnInit {

  @Input() ticket!: number[];

  constructor() { }

  ngOnInit(): void {
  }

}
