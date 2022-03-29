import { Component, OnInit } from '@angular/core';
import {TicketsStore} from "../../services/tickets-store";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public store: TicketsStore) { }

  ngOnInit(): void {
  }

}
