import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { MoviesService } from './../services/movies.service';
 
@Injectable()
export class MovieResolver implements Resolve<any> {
  constructor(private moviesService: MoviesService) {}
 
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let id = parseInt(route.paramMap.get('id'));
 
    return this.moviesService.getMovieById(id);
  }
}
