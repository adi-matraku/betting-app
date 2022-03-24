import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validator, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {customValidator} from "../../utils/customValidator";
import { v4 as uuidv4 } from 'uuid';
import {TicketsStore} from "../../../../services/tickets-store";

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {

  ticket: boolean = false;
  numbers: {name: string; value: number}[] = this.getArrayNumbers();

  form = this.fb.group({
    uuid: [uuidv4()],
    selectedNr: ['', [customValidator(), Validators.required]],
    price: [5]
  })

  constructor(
    private fb: FormBuilder,
    public store: TicketsStore
  ) { }

  ngOnInit(): void {
  }

  btn() {
    this.ticket = true;
  }

  getArrayNumbers(): {name: string; value: number}[] {
    const arrayNumbers = [];
    for(let i = 1; i < 40; i++) {
      arrayNumbers.push({name: i + '', value: i})
    }
    return arrayNumbers;
  }

  ticketSubmit() {
    console.log(this.form.value)
    this.store.addTicket(this.form.value);

    this.form.get('uuid')?.patchValue(uuidv4());
    this.form.get('price')?.patchValue(5);

    this.form.get('selectedNr')?.reset();
  }

}
