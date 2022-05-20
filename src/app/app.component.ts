import { Component } from '@angular/core';
import { AuthServiceService } from './auth/auth-service.service';

@Component({
  selector: 'app-root',
  template: `
<mat-toolbar class="mat-elevation-z8">
  <button
    mat-icon-button
    *ngIf="sidenav.mode === 'over'"
    (click)="sidenav.toggle()"
  >
    <mat-icon *ngIf="!sidenav.opened"> menu </mat-icon>
    <mat-icon *ngIf="sidenav.opened"> close </mat-icon>
  </button>
  <h1><span>N</span> E T F L I <span>X</span></h1>
</mat-toolbar>

<mat-sidenav-container class="cont">
  <mat-sidenav #sidenav="matSidenav" class="mat-elevation-z8">
    <img class="avatar mat-elevation-z8" src="https://www.technorati.it/wp-content/uploads/2019/01/Netflix.png"/>

    <h4 *ngIf="userName" class="name">{{userName}}</h4>
    <p *ngIf="login" class="designation">Private Dashboard</p>

    <mat-divider></mat-divider>

    <button (click)="sidenav.toggle()"  mat-button class="menu-button" routerLink="/">
      <mat-icon>home</mat-icon>
      <span>Home</span>
    </button>
    <button *ngIf="login" (click)="sidenav.toggle()" mat-button class="menu-button" routerLink="/userinfo">
      <mat-icon>person</mat-icon>
      <span>Profile</span>
    </button>
    <button *ngIf="login" (click)="[logout(), sidenav.toggle()]" mat-button class="menu-button">
      <mat-icon>closee</mat-icon>
      <span>Logout</span>
    </button>

    <mat-divider></mat-divider>
  </mat-sidenav>
  <mat-sidenav-content>
    <div class="content mat-elevation-z8">
      <router-outlet></router-outlet>
    </div>
  </mat-sidenav-content>
</mat-sidenav-container>
  `,
  styles: [`
  h1 {
    margin: 0 auto;
  }
  h1 span {
    font-size: 1.3em;
  }
  .cont {
    background-image: url('https://assets.nflxext.com/ffe/siteui/vlv3/6e32b96a-d4be-4e44-a19b-1bd2d2279b51/4064e2c8-4fbb-498c-9f70-e268b11cc5be/IT-it-20220516-popsignuptwoweeks-perspective_alpha_website_large.jpg');
    background-size: cover;
  }

  mat-toolbar {
    background: #E50914;
    color: white;
  }

  mat-sidenav {
    margin: 16px;
    width: 200px;
    border-right: none;
    background: #ff4040;
    color: white;
    border-radius: 10px;
    padding: 16px;
    text-align: center;
  }

  .content {
    height: calc(100vh - 130px);
    border-radius: 10px;
    margin: 16px;
    margin-left: 32px;
    padding: 16px;
    overflow: auto;
  }

  mat-sidenav-container {
    height: calc(100vh - 65px);
  }

  .menu-button {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 1rem;

    mat-icon {
      margin-right: 8px;
    }
  }

  .avatar {
    margin-top: 16px;
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }

  .name {
    margin-top: 8px;
    font-weight: normal;
  }

  .designation {
    margin-top: 2px;
    font-size: 0.7rem;
    color: lightgrey;
  }

  mat-divider {
    margin-top: 16px;
    margin-bottom: 16px;
    background-color: rgba(255, 255, 255, 0.5);
  }`]
})
export class AppComponent {
  login: boolean = false;
  userName: string = 'Loggati'

  constructor(private srvAuth: AuthServiceService) { }

  logout() {
    this.srvAuth.logout();
  }

  ngOnInit(): void {

    this.srvAuth.restoreUser();
    this.srvAuth.loggedIn$.subscribe((log) => {
      this.login = log;
    })

    this.srvAuth.user$.subscribe(
      (user) => {
        if (user) {
          this.userName = user.user.name
        } else {
          this.userName = 'Loggati'
        }
      }
    )
  }

}
