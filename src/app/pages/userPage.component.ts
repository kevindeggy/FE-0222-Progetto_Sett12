import { getInterpolationArgsLength } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth/auth-service.service';
import { AuthData } from '../models/AuthDatat';
import { Movies } from '../models/Movies';
import { MovieServiceService } from '../service/movie-service.service';
import { UserService } from '../service/user.service';

@Component({
  template: `
   <mat-accordion *ngIf="!loading && userLog">
  <mat-expansion-panel (opened)="panelOpenState = true"
                       (closed)="panelOpenState = false">
    <mat-expansion-panel-header>
      <mat-panel-title>
        {{userLog.user.name}}
      </mat-panel-title>
      <mat-panel-description>
        Clicca qui per Maggiori info:
      </mat-panel-description>
    </mat-expansion-panel-header>
    <p>Email Utente: {{userLog.user.email}}</p>
    <hr>
    <h3>Film Preferiti:</h3>
    <ul>
      <p *ngIf="loadFilm"><img width="50px" src="https://www.iper.it/take-away/images/loading.gif"/></p>
    <li *ngFor="let item of titoli">{{item}}</li>
    </ul>
  </mat-expansion-panel>
</mat-accordion>

  `,
  styles: [
  ]
})
export class UserPageComponent implements OnInit {
  loading: boolean = true;
  loadFilm: boolean = true;
  userLog!: AuthData;
  panelOpenState = false;
  filmPref: number[] = [];
  titoli: string[] = []

  constructor(private srvAuth: AuthServiceService, private srvUser: UserService, private srvMovie: MovieServiceService) {
  }

  getTitle(filmsPref: number[]) {
    this.srvMovie.getAllMovies().subscribe((res) => {
      for (let j = 0; j < filmsPref.length; j++) {
        for (let i = 0; i < res.length; i++) {
          if (res[i].id === filmsPref[j]) {
            this.titoli.push(res[i].title)
          }
        }
      }
      this.loadFilm = false;
    })
  }

  ngOnInit(): void {
    this.srvAuth.user$.subscribe((user) => {
      if (user) {
        this.userLog = user
        this.loading = false
      }

      this.srvUser.getFavoritesFilter().subscribe((res) => {
        let resNuova = res.filter(x => x.userId === this.userLog.user.id);
        for (let i = 0; i < resNuova.length; i++) {
          this.filmPref[i] = resNuova[i].movieId;
        }
        this.getTitle(this.filmPref);
      })
    })
  }

}
