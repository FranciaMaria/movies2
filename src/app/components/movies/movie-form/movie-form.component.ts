import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Movie } from '../../../shared/models/movie.model';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css']
})
export class MovieFormComponent implements OnInit {

  @Output() onSubmit = new EventEmitter<Movie>();

  private newMovie: Movie = new Movie();

  constructor() {
  }

  submitMovie(movie: Movie) {
    this.onSubmit.emit(movie);
    this.newMovie = new Movie();
  }

  edit(movie: Movie) {
    this.newMovie = Object.assign({}, movie);
  }
  ngOnInit() {
  }

}
