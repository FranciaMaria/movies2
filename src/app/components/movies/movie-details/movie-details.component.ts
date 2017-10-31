import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../../../shared/services/movies.service';
import { Movie } from '../../../shared/models/movie.model';


@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  private movie: Movie;

  constructor(private route: ActivatedRoute,
              private moviesService: MoviesService) {
  }

  ngOnInit() {
    this.route.data
      .subscribe((data: {movie : Movie}) => {
        this.movie = data.movie;
      });
  }


}
