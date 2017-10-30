import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Movie } from '../../../shared/models/movie.model';

@Component({
  selector: 'app-movie-row, [movieRow]',
  templateUrl: './movie-row.component.html',
  styleUrls: ['./movie-row.component.css']
})
export class MovieRowComponent implements OnInit, OnChanges {

	private movie: any;
  	private select: any;
  	private deselect: any;

	@Input() movieRow: Movie;

	@Input() selectedAny;

	@Input() selectedAll: boolean;
  @Input() deselectAll: boolean;


    @Output() onSelected = new EventEmitter<boolean>();

   
    private isSelected: number;
    private selected = false;
    private movies: Movie[] = [];

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


}
