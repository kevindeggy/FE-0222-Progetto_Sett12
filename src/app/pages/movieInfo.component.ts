import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movies } from '../models/Movies';
import { MovieServiceService } from '../service/movie-service.service';

@Component({
  template: `
      <div *ngIf="loading" class="container">

<mat-card class="movie-card">
  <mat-card-header>
    <mat-card-title class="titleMovie"></mat-card-title>
  </mat-card-header>
  <img mat-card-image src="https://www.iper.it/take-away/images/loading.gif"/>

  <mat-card-actions>
    <button mat-button></button>
    <button mat-button></button>
  </mat-card-actions>
  <mat-card-footer>
    <mat-progress-bar mode="indeterminate" color="warn"></mat-progress-bar>
  </mat-card-footer>
</mat-card>

</div>

 <div *ngIf="!loading" class="container">

    <mat-card class="movie-card">
      <img mat-card-image src="https://image.tmdb.org/t/p/w500{{movie.poster_path}}"/>
      <mat-card-footer>
        <mat-progress-bar mode="indeterminate" color="warn"></mat-progress-bar>
      </mat-card-footer>
    </mat-card>

    <mat-card class="movie-card-info">
      <mat-card-header>
        <mat-card-title class="titleMovie">TITOLO: {{movie.title | uppercase}}</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <p>Descrizione:</p>
        <p>{{movie.overview}}</p>
        <p>Data si uscita: {{movie.release_date}}</p>
        <img class="img" mat-card-image src="https://image.tmdb.org/t/p/w500{{movie.backdrop_path}}"/>
        <mat-progress-bar color="warn" mode="determinate" value="{{movie.vote_average * 10}}"></mat-progress-bar>
        <p>Voto: {{movie.vote_average * 10}} / 100</p>

      </mat-card-content>

      <mat-card-actions>
        <button [routerLink]= "['/']" mat-button>Ritorna Indietro</button>
      </mat-card-actions>
    </mat-card>

   </div>
  `,
  styles: [`
   .movie-card {
  max-width: 21%;
  min-width: 21%;
  max-heigth: 90%;
  box-shadow: 4px 4px 10px black;
  color: #E50914;
  opacity: 0.9;
}
.movie-card-info {
  max-heigth: 90%;
  color: #E50914;
}
.img {
  max-height: 300px;
  width: auto;
  margin: 1em auto;
}
.movie-card:hover {
  box-shadow: 3px 3px 14px 12px black;
  opacity: 1;
}
.titleMovie {
  font-size: 1em;
}
.container {
  display: flex;
  gap:1em;
  vertical-align: center
}
.progressbar {
  color: red;
}
  `
  ]
})
export class MovieInfoComponent implements OnInit {
  loading: boolean = true;
  filmSelectedID!: number;
  movie!: Movies

  constructor(private srvMovie: MovieServiceService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.filmSelectedID = this.router.snapshot.params["id"];

    this.srvMovie.getOneMovie(this.filmSelectedID).subscribe((res) => {
      this.movie = res;
      this.loading = false;
    })
  }

}
