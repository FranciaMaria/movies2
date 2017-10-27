import { Injectable } from '@angular/core';
import { Observer, Observable } from 'rxjs';
import { Movie } from '../../shared/models/movie.model';
//import { exampleMovies } from '../../shared/examples';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class MoviesService {

  private movies: Movie[] = [];

  constructor(private http: HttpClient) {}

 /* public getMovies(){

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
  }*/

  public getMovies()
  {
    return new Observable((o: Observer<any>) => {
      this.http.get('http://localhost:8000/api/movies')
        .subscribe(
          (movies: any[]) => {
            movies.forEach(c => {
              this.movies.push(new Movie(c.id, c.name, c.director, c.imageUrl, c.duration, c.releaseDate, c.genres));
            });

            o.next(this.movies);
            return o.complete();
          }
        );
    });
  }


  public search($term){
    let movies: Movie [] = [];
    return new Observable((o: Observer<any>) =>{
      this.http.get('http://localhost:8000/api/movies')
        .subscribe(
          (movies: any[]) => {
            movies.forEach(movie => {
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
   });
  }
}


