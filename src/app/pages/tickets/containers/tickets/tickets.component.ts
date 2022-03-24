import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validator, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {customValidator} from "../../utils/customValidator";

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {

  ticket: boolean = false;
  numbers: {name: string; value: number}[] = this.getArrayNumbers();
  selectedNumbers: number[] = [];

  form = this.fb.group({
    selectedNr: ['', [customValidator(), Validators.required]]
  })

  constructor(private fb: FormBuilder) { }

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
    // console.log(this.form.value.selectedNr);

    this.selectedNumbers = this.form.value.selectedNr

    this.form.reset();

    console.log(this.selectedNumbers);
  }

}
