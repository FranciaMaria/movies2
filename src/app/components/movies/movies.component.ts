import { Component, OnInit, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MoviesService } from '../../shared/services/movies.service';
import { Movie } from '../../shared/models/movie.model';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

	movies: Movie[] = [];
  public counter = 0;
  public selectedAll = false;
  public selectedAny = false;
  private order = 'name';
  private reverse = false;

  

  constructor(private moviesService: MoviesService, private injector: Injector) { 

    this.moviesService = this.injector.get(MoviesService);
    this.moviesService.getMovies().subscribe(
      data => {
        this.movies = data;
      },
      (err: HttpErrorResponse) => {
        alert('Backend returned code ${err.status} with message: ${err.error}');
      }
    );
  }

  remove(movie) {
    this.moviesService.removeMovie(movie)
        .subscribe();
  }

  submitMovie(movie: Movie) {
    if (movie.id) {
      this.moviesService.editMovie(movie)
        .subscribe();
    } else {
      this.moviesService.addMovie(movie)
        .subscribe();
    }
  }

  ngOnInit() {
  	this.moviesService.getMovies().subscribe(data =>{
  		this.movies = data;
  	})
  }

  setOrder(value: string) {
        if (this.order === value) {
          this.reverse = !this.reverse;
        }

        this.order = value;
    }


    onSelected(agreed: boolean) {
        this.counter++;
        this.selectedAny = true;
    }

    selectAllCounter() {
        this.counter = this.movies.length;
    }

    deselectAllCounter() {
        this.counter = 0;
    }
}
