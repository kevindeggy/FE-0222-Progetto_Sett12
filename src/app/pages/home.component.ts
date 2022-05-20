import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth/auth-service.service';
import { Favorites } from '../models/Favorites';
import { FavoritesInDB } from '../models/FavoritesInDB';
import { Movies } from '../models/Movies';
import { MovieServiceService } from '../service/movie-service.service';
import { UserService } from '../service/user.service';

@Component({
  template: `

  <div *ngIf="loading" class="container">

<mat-card *ngFor="let item of loadingArray" class="movie-card">
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

    <mat-card *ngFor="let item of movies; let i = index" class="movie-card">
      <mat-card-header>
        <mat-card-title class="titleMovie">{{item.title | uppercase}}</mat-card-title>
      </mat-card-header>
      <img mat-card-image src="https://image.tmdb.org/t/p/w500{{item.poster_path}}"/>

      <mat-card-actions>
        <button *ngIf="moviesFav[i] && !loadingClickLike[i]" (click)="[clickLike(), postUnlike(item.id, i)]" mat-button><mat-icon>thumb_up</mat-icon> Like</button>
        <button mat-button *ngIf="loadingClickLike[i]"><img width="50px" src="https://www.iper.it/take-away/images/loading.gif"/></button>
        <button *ngIf="!moviesFav[i] && !loadingClickLike[i]" (click)="[clickLike(), postLike(item.id, i)]" mat-button class="icon"><mat-icon class="icon">thumb_up</mat-icon> Like</button>
        <button [routerLink]= "['/movieinfo',item.id]" mat-button>Dettagli</button>
      </mat-card-actions>
      <mat-card-footer>
        <mat-progress-bar mode="indeterminate" color="warn"></mat-progress-bar>
      </mat-card-footer>
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
.icon {
  color: grey;
}
.load {
  width: 30px;
  max-heigth: 20px
}
  `],
})
export class HomeComponent implements OnInit {
  movies: Movies[] = []
  moviesFav: any = []
  loadingArray = [1, 2, 3, 4, 5, 6]
  loading = true;
  loadingClickLike: any = []
  like: boolean = false;
  userId!: number;

  constructor(private srvMovie: MovieServiceService, private srvUser: UserService, private srvAuth: AuthServiceService) { }

  clickLike() {
    this.like = !this.like
  }

  setFilmFavorite(filmFav: FavoritesInDB[]) {
    this.moviesFav.fill(this.movies.length)
    this.loadingClickLike.fill(this.movies.length)
    for (let k = 0; k < this.moviesFav.length; k++) {
      this.moviesFav[k] = false;
      this.loadingClickLike[k] = false;
    }
    for (let i = 0; i < filmFav.length; i++) {
      for (let j = 0; j < this.movies.length; j++) {
        if (filmFav[i].movieId === this.movies[j].id) {
          this.moviesFav[j] = true;
        }
      }
    }
    this.loading = false;
  }

  postLike(idFilm: number, index: number) {
    this.loadingClickLike[index] = true;
    this.userId = this.srvAuth.userIdLog;
    let data: Favorites = {
      movieId: idFilm,
      userId: this.userId
    }
    this.srvUser.postFavorites(data).subscribe(() => {
      this.moviesFav[index] = true;
      this.loadingClickLike[index] = false;
    });
  }

  postUnlike(idFilm: number, index: number) {
    this.loadingClickLike[index] = true;
    this.srvUser.getFavoritesFilter().subscribe((res) => {
      let nuovaRes = res.filter(x => x.movieId === idFilm && x.userId === this.userId)

      this.srvUser.deleteFavorites(nuovaRes[0].id).subscribe(() => {
        this.moviesFav[index] = false;
        this.loadingClickLike[index] = false;
      });
    })
  }

  ngOnInit(): void {
    this.srvMovie.getAllMovies().subscribe((res) => {
      this.movies = res;

      this.userId = this.srvAuth.userIdLog;
      this.srvUser.getFavoritesFilter().subscribe((res) => {
        let nuovaRes = res.filter(x => x.userId === this.userId);
        this.setFilmFavorite(nuovaRes)
      })
    })
  }

}
