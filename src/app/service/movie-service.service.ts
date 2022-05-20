import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movies } from '../models/Movies';

@Injectable({
  providedIn: 'root'
})

export class MovieServiceService {

  constructor(private http: HttpClient) { }

  getAllMovies() {
    return this.http.get<Movies[]>('http://localhost:4201/movies-popular')
  }

  getOneMovie(idMovie: number) {
    return this.http.get<Movies>(`http://localhost:4201/movies-popular/${idMovie}`)
  }
}
