import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth/auth-service.service';
import { DialogComponent } from '../components/dialog.component';
import { DialogSuccessComponent } from '../components/dialogSuccess.component';

@Component({
  template: `
   <div class="signup">
    <h1>Signup in NETFLIX</h1>

<form class="signup-form" #form="ngForm" (ngSubmit)="submitSignup(form)">
<mat-form-field color="accent" class="signup-full-width" appearance="fill">
    <mat-label class="label">Name</mat-label>
    <input pattern="[a-zA-Z]" type="text" matInput required ngModel name="name" [errorStateMatcher]="matcher"
           placeholder="Ex. Mario Rossi">
    <mat-error class="label" *ngIf="emailFormControl.hasError('required')">
      Name is <strong>required</strong>
    </mat-error>
  </mat-form-field>

  <mat-form-field color="accent" class="signup-full-width" appearance="fill">
    <mat-label class="label">Email</mat-label>
    <input pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" type="email" matInput required email ngModel name="email" [errorStateMatcher]="matcher"
           placeholder="Ex. pat@example.com">
    <mat-error class="label" *ngIf="emailFormControl.hasError('email') && !emailFormControl.hasError('required')">
      Please enter a valid email address
    </mat-error>
    <mat-error class="label" *ngIf="emailFormControl.hasError('required')">
      Email is <strong>required</strong>
    </mat-error>
  </mat-form-field>

  <mat-form-field color="accent" class="signup-full-width" appearance="fill">
    <mat-label class="label">Password</mat-label>
    <input type="password" matInput required ngModel name="password" [errorStateMatcher]="matcher"
           placeholder="Ex. 654321">
    <mat-error class="label" *ngIf="emailFormControl.hasError('required')">
      Password is <strong>required</strong>
    </mat-error>
  </mat-form-field>
  <mat-spinner *ngIf="loading" class="spinner" color="accent"></mat-spinner>
    <button *ngIf="!loading" class="btn-form" type="submit" [disabled]="form.invalid" mat-button>SIGNUP</button>
    <button *ngIf="!loading" class="btn-form" mat-button routerLink="/login">RETURN LOGIN</button>
</form>

</div>
  `,
  styles: [`
   .signup {
  background-color: #E50914;
  color: white;
  border-radius: 10px;
  margin: 150px auto;
  padding: 2.5em;
  text-align: center;
  width: 50%;
  box-shadow: 3px 3px 14px black;
}
.signup-form {
  min-width: 150px;
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
}
.signup-full-width {
  width: 100%;
}
.label {
  color:white;
}
.btn-form {
  border:1px solid black;
  margin-right: 20px;
}
.spinner {
  margin: 0 auto;
}
`
  ]
})
export class SignupComponent implements OnInit {
  loading: boolean = false

  constructor(private srvAuth: AuthServiceService, private route: Router, public dialog: MatDialog) { }

  async submitSignup(form: NgForm) {
    this.loading = true
    try {
      await this.srvAuth.register(form.value).toPromise()
      form.reset();
      setTimeout(() => {
        this.loading = false
        this.openDialogSucc()
      }, 1500);
      this.route.navigate(['/login']);
    } catch (error) {
      setTimeout(() => {
        this.loading = false
        this.openDialog()
      }, 1500);
    }
  }

  openDialog() {
    this.dialog.open(DialogComponent);
  }

  openDialogSucc() {
    this.dialog.open(DialogSuccessComponent);
  }

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  matcher = new MyErrorStateMatcher();

  ngOnInit(): void {
  }

}
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
