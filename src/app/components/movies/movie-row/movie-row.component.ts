import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Movie } from '../../../shared/models/movie.model';

@Component({
  selector: '[movieRow], app-movie-row',
  templateUrl: './movie-row.component.html',
  styleUrls: ['./movie-row.component.css']
})
export class MovieRowComponent implements OnInit, OnChanges {

	private movie: Movie;
  private select: any;
  private deselect: any;

  private isSelected: number;
  private selected = false;
  private movies: Movie[] = [];


	//@Input() movieRow: Movie;

	@Input() selectedAny;

	@Input() selectedAll: boolean;
  @Input() deselectAll: boolean;

  @Input()
    set movieRow(movie: Movie) {
    this.movie = movie;
  }

  @Output() onSelected = new EventEmitter<boolean>();

  @Output() onEdit = new EventEmitter<Movie>();
  @Output() onRemove = new EventEmitter<Movie>();
   
    constructor() { }

    ngOnChanges(changes) {
        if (this.selectedAny === false) {
            this.selected = this.selectedAll;
        }
    }

    ngOnInit() {

    }

    addMovie(agreed: boolean) {
        this.onSelected.emit(agreed);
        this.selected = true;
    }

    edit(movie: Movie) {
      this.onEdit.emit(movie);
    }

    remove(movie: Movie) {
      this.onRemove.emit(movie);
    }



}
