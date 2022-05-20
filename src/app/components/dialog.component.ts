import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog',
  template: `
   <h1 mat-dialog-title>Error</h1>
<div mat-dialog-content>Errore nella Registrazione</div>
<div mat-dialog-actions>
  <button mat-button mat-dialog-close>Close</button>
</div>
  `,
  styles: [
  ]
})
export class DialogComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
