import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../../../shared/services/movies.service';
import { Movie } from '../../../shared/models/movie.model';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {

  private movies: Movie[] = [];
  private term;

  constructor(private route: ActivatedRoute, private moviesService: MoviesService) { }

  ngOnInit() {
  	let term = this.route.snapshot.paramMap.get('term');
  	this.moviesService.search(term).subscribe(data =>{
  		this.movies = data;
  		this.term = term;
  	});
  }

}
