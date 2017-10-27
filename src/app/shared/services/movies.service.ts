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

  public addContact(movie: Movie)
  {
    return new Observable((o: Observer<any>) => {
      this.http.post('http://localhost:8000/api/movies', {
        'name': movie.name,
        'director': movie.director,
        'imageUrl': movie.imageUrl,
        'duration': movie.duration,
        'releaseDate': movie.releaseDate,
        'genres': movie.genres,
        
      },
      /*{
        headers: this.authService.getRequestHeaders(),
      }*/)
        .subscribe(
          (c: any) => {
            let newC = new Movie(c.id, c.name, c.director, c.imageUrl, c.duration, c.releaseDate, c.genres);
            this.movies.push(newC);
            o.next(newC);
            return o.complete();
          }
        );
    });
  }

  public editContact(movie: Movie)
  {
    return new Observable((o: Observer<any>) => {
      this.http.put('http://localhost:8000/api/movies/' + movie.id, {
        'name': movie.name,
        'director': movie.director,
        'imageUrl': movie.imageUrl,
        'duration': movie.duration,
        'releaseDate': movie.releaseDate,
        'genres': movie.genres,
      },
      /*{
        headers: this.authService.getRequestHeaders(),
      }*/)
        .subscribe(
          (contact: any) => {
            let existing = this.movies.filter(c => c.id == movie.id);
            if (existing.length) {
              existing[0].firstName = contact.first_name;
              existing[0].lastName = contact.last_name;
              existing[0].email = contact.email;
            }

            o.next(existing[0]);
            return o.complete();
          }
        );
    });
  }

  public removeContact(movie: Movie)
  {
    return new Observable((o: Observer<any>) => {
      this.http.delete('http://localhost:8000/api/contacts/' + contact.id,
        {
          headers: this.authService.getRequestHeaders(),
        })
        .subscribe(
          () => {
            const index = this.contacts.indexOf(contact);
            this.contacts.splice(index, 1);

            o.next(index);
            return o.complete();
          }
        );
    });
  }

  public getContactById(id: number)
  {
    return new Observable((o: Observer<any>) => {
      this.http.get('http://localhost:8000/api/contacts/' + id,
        {
          headers: this.authService.getRequestHeaders(),
        })
        .subscribe(
          (contact: any) => {
            o.next(new Contact(contact.id, contact.first_name, contact.last_name, contact.email));
            return o.complete();
          }
        );
    });
  }

}


