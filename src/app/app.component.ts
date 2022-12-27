import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-navbar></app-navbar>
    <app-tickets></app-tickets>
  `
})
export class AppComponent {
  title = 'betting-app';
}
