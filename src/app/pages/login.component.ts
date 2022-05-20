import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth/auth-service.service';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogLoginComponent } from '../components/dialogLogin.component';

@Component({
  template: `
   <div class="login">
<h1>Login in NETFLIX</h1>

<form class="login-form" #form="ngForm" (ngSubmit)="submitLogin(form)">
  <mat-form-field color="accent" class="login-full-width" appearance="fill">
    <mat-label pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" class="label">Email</mat-label>
    <input type="email" matInput required email ngModel name="email" [errorStateMatcher]="matcher"
           placeholder="Ex. pat@example.com">
    <mat-error class="label" *ngIf="emailFormControl.hasError('email') && !emailFormControl.hasError('required')">
      Please enter a valid email address
    </mat-error>
    <mat-error class="label" *ngIf="emailFormControl.hasError('required')">
      Email is <strong>required</strong>
    </mat-error>
  </mat-form-field>

  <mat-form-field color="accent" class="login-full-width" appearance="fill">
    <mat-label class="label">Password</mat-label>
    <input type="password" matInput required ngModel name="password" [errorStateMatcher]="matcher"
           placeholder="Ex. 654321">
    <mat-error class="label" *ngIf="emailFormControl.hasError('required')">
      Password is <strong>required</strong>
    </mat-error>
  </mat-form-field>

    <button class="btn-form" type="submit" [disabled]="form.invalid" mat-button>LOGIN</button>
    <button class="btn-form" mat-button routerLink="/signup">REGISTER</button>
</form>

</div>
  `,
  styles: [`
  .login {
  background-color: #E50914;
  color: white;
  border-radius: 10px;
  margin: 150px auto;
  padding: 2.5em;
  text-align: center;
  width: 50%;
  box-shadow: 3px 3px 14px black;
}
.login-form {
  min-width: 150px;
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
}
.login-full-width {
  width: 100%;
}
.label {
  color:white;
}
.btn-form {
  border:1px solid black;
  margin-right: 20px;
}
`
  ]
})
export class LoginComponent implements OnInit {
  loading: boolean = false

  constructor(private srvAuth: AuthServiceService, private route: Router, public dialog: MatDialog) { }

  async submitLogin(form: NgForm) {
    this.loading = true
    try {
      await this.srvAuth.login(form.value).toPromise()
      form.reset();
      setTimeout(() => {
        this.loading = false
      }, 1500);
      this.route.navigate(['/']);
    } catch (error) {
      setTimeout(() => {
        this.loading = false
        this.openDialog()
      }, 1500);
    }
  }

  openDialog() {
    this.dialog.open(DialogLoginComponent);
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
