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
            movies.forEach((c) => {
              this.movies.push(new Movie(c.id, c.name, c.director, c.imageUrl, c.duration, c.releaseDate, c.genres));
              o.next(this.movies);
            });
          });
            o.next(this.movies);
            return o.complete();
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

  public addMovie(movie: Movie)
  {
    return new Observable((o: Observer<any>) => {
      this.http.post('http://localhost:8000/api/movies', {
        'name': movie.name,
        'director': movie.director,
        'imageUrl': movie.imageUrl,
        'duration': movie.duration,
        'releaseDate': movie.releaseDate,
        'genres': movie.genres
        
      }
      /*{
        headers: this.authService.getRequestHeaders(),
      }*/)
        .subscribe(
          (c: any) => {
            let newC = new Movie(c.id, c.name, c.director, c.imageUrl, c.duration, c.releaseDate, c.genres);
            this.movies.push(newC);
            o.next(this.movies);
            return o.complete();
          }
        );
    });
  }

  public editMovie(movie: Movie)
  {
    return new Observable((o: Observer<any>) => {
      this.http.put('http://localhost:8000/api/movies/' + movie.id, {
        'name': movie.name,
        'director': movie.director,
        'imageUrl': movie.imageUrl,
        'duration': movie.duration,
        'releaseDate': movie.releaseDate,
        'genres': movie.genres,
      }
      /*{
        headers: this.authService.getRequestHeaders(),
      }*/)
        .subscribe(
          (movie: any) => {
            let newMovie = new Movie(movie.id, movie.name, movie.director, movie.imageUrl, movie.duration, movie.releaseDate, movie.genres);
            let existing = this.movies.filter((con) => {
              return con.id == movie.id;
            });
            if (existing.length) {
              existing[0].name = movie.name;
              existing[0].director = movie.director;
              existing[0].imageUrl = movie.imageUrl;
              existing[0].duration = movie.duration;
              existing[0].releaseDate = movie.releaseDate;
              existing[0].genres = movie.genres;
            }

            o.next(existing[0]);
            return o.complete();
          }
        );
    });
  }

  public removeMovie(movie: Movie)
  {
    return new Observable((o: Observer<any>) => {
      this.http.delete('http://localhost:8000/api/movies/' + movie.id
        /*{
          headers: this.authService.getRequestHeaders(),
        }*/)
        .subscribe(
          () => {
            const index = this.movies.indexOf(movie);
            this.movies.splice(index, 1);

            o.next(index);
            return o.complete();
          }
        );
    });
  }

  /*public getMovieById(id: number)
  {
    return new Observable((o: Observer<any>) => {
      this.http.get('http://localhost:8000/api/movies/' + id
        /*{
          headers: this.moviesService.getRequestHeaders(),
        }*//*)
        .subscribe(
          (movie: any) => {
            o.next(new Movie(movie.id, movie.name, movie.director, movie.imageUrl, movie.duration, movie.releaseDate, movie.genres));
            return o.complete();
          }
        );
    });
  }*/

  public getContactById(id: number)
  {
    return new Observable((o: Observer<any>) => {
      let existing = this.movies.filter(c => c.id == id);
      if (existing.length) {
        o.next(existing);
        return o.complete();
      } else {
        return o.error('Not found');
      }
    });
  }


}


