import { Component, OnInit } from '@angular/core';
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


  constructor(private moviesService: MoviesService) { }

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
