import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Favorites } from '../models/Favorites';
import { FavoritesInDB } from '../models/FavoritesInDB';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(private http: HttpClient) { }

  getFavoritesFilter() {
    return this.http.get<FavoritesInDB[]>(`http://localhost:4201/favorites`)
  }

  postFavorites(data: Favorites) {
    return this.http.post<Favorites>('http://localhost:4201/favorites', data)
  }

  deleteFavorites(idFav: number) {
    return this.http.delete<Favorites>(`http://localhost:4201/favorites/${idFav}`)
  }

}
