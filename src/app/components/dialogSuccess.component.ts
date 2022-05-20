import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog',
  template: `
   <h1 mat-dialog-title>Success</h1>
<div mat-dialog-content>Benvenuto in Netflix</div>
<div mat-dialog-actions>
  <button mat-button mat-dialog-close>Close</button>
</div>
  `,
  styles: [
  ]
})
export class DialogSuccessComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
