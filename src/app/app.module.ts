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
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/auth/login/login.component';
import { AuthService } from './shared/services/auth.service';
import { RegisterComponent } from './components/auth/register/register.component';
import { RegisterFormComponent } from './components/auth/register/register-form/register-form.component';
import { CustomFormsModule } from 'ng2-validation';
import { MovieResolver } from './shared/resolvers/movie.resolver';
import { MovieDetailsComponent } from './components/movies/movie-details/movie-details.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { GuestGuard } from './shared/guards/guest.guard';


const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/movies',
    pathMatch: 'full'
  },
  {
    path: 'movies',
    canActivate: [AuthGuard],
    component: MoviesComponent
  },
  {
    path: 'movies/:id',
    component: MovieDetailsComponent,
    resolve: {
          movie: MovieResolver
    }
  },
  {
    path: 'search/:term',
    component: SearchPageComponent
  },
  {
    path: 'add',
    component: MovieFormComponent
  },
  {
    path: 'login',
    canActivate: [GuestGuard],
    component: LoginComponent
  },
  {
    path: 'register',
    canActivate: [GuestGuard],
    component: RegisterFormComponent
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
    MovieFormComponent,
    LoginComponent,
    RegisterComponent,
    RegisterFormComponent,
    MovieDetailsComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    OrderModule,
    Ng2PaginationModule,
    HttpClientModule,
    CustomFormsModule,
    RouterModule.forRoot(
      appRoutes),
  ],
  exports: [
    LayoutComponent, 
    SearchComponent,
    SearchPageComponent
  ],
  providers: [MoviesService, AuthService, MovieResolver, GuestGuard, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
