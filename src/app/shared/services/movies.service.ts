import { Injectable } from '@angular/core';
import { Observer, Observable } from 'rxjs';
import { Movie } from '../../shared/models/movie.model';
import { exampleMovies } from '../../shared/examples';


@Injectable()
export class MoviesService {

  constructor() { }

  public getMovies(){

  	let movies: Movie[] = [];
  	return new Observable((o: Observer<any>) => { 
  		exampleMovies.forEach(movie => {
  			movies.push(new Movie(
  				movie.id,
  				movie.name,
  				movie.director,
  				movie.imageUrl,
  				movie.duration,
  				movie.releaseDate,
  				movie.genres
  			));

  		});
  		o.next(movies);
  		o.complete();
  	});
  }

  public search($term){
  	let movies: Movie [] = [];
  	return new Observable((o: Observer<any>) =>{
  		exampleMovies.forEach(movie =>{
  			if(movie.name.match($term)){
  				movies.push(movie);
  			}
  			else{
  				return "No match!";
  			}
  		});
  		o.next(movies);
  		o.complete();
  	});
  }

}
