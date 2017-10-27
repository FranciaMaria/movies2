import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout.component';
import { MoviesComponent } from './components/movies/movies.component';
import { MoviesService } from './shared/services/movies.service';
import { MovieRowComponent } from './components/movies/movie-row/movie-row.component';
import { SearchComponent } from './components/search/search.component';
import { FormsModule } from '@angular/forms';
import { SearchPageComponent } from './components/search/search-page/search-page.component';
import { OrderModule } from 'ngx-order-pipe';
import { Ng2PaginationModule } from 'ng2-pagination';
import { MovieFormComponent } from './components/movies/movie-form/movie-form.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/movies',
    pathMatch: 'full'
  },
  {
    path: 'movies',
    component: MoviesComponent
  },
  {
    path: 'search/:term',
    component: SearchPageComponent
  },
  {
    path: '/add',
    component: MovieFormComponent
  },
];


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    MoviesComponent,
    MovieRowComponent,
    SearchComponent,
    SearchPageComponent,
    MovieFormComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    OrderModule,
    Ng2PaginationModule,
    RouterModule.forRoot(
      appRoutes),
  ],
  exports: [
    LayoutComponent, 
    SearchComponent,
    SearchPageComponent
  ],
  providers: [MoviesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
