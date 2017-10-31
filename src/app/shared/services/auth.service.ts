import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { User } from '../models/user.model';

@Injectable()
export class AuthService {

  public isAuthenticated: boolean;
  private users: User[] = [];

  constructor(private http: HttpClient) {
  	this.isAuthenticated = !!window.localStorage.getItem('loginToken');
  }

  register(name: string, email: string, password: string)
  {
    return new Observable((o: Observer<any>) => {
      this.http.post('http://localhost:8000/api/register', {
        'name': name,
        'email': email,
        'password': password
        })
        .subscribe(
          (c: any) => {
            let newC = new User(c.id, c.name, c.email, c.password);
            this.users.push(newC);
            o.next(this.users);
            return o.complete();
          }
        );
    });
  }

   public addUser(user: User)
  {
    return this.http.post('http://localhost:8000/api/register', {
  
      name: user.name,  
      email: user.email,
      password: user.password
    });
}

  /*register(name:string, email: string, password: string)
  {
    return new Observable((o: Observer<any>) => {
      this.http.post('http://localhost:8000/api/register', {
        'name': name,
        'email': email,
        'password': password
        })
          .subscribe(
            (data: {token: string}) => {
              window.localStorage.setItem('loginToken', data.token);
              this.isAuthenticated = false;

              o.next(data.token);
              return o.complete();
            },
            (err) => {
              // samo proslediti
              return o.error(err);
            }
          );
    });
  }
*/
  login(email: string, password: string)
  {
  	return new Observable((o: Observer<any>) => {
    	this.http.post('http://localhost:8000/api/login', {
  			'email': email,
  			'password': password
  	  	})
	        .subscribe(
	          (data: {token: string}) => {
	          	window.localStorage.setItem('loginToken', data.token);
	          	this.isAuthenticated = true;

	            o.next(data.token);
	            return o.complete();
	          },
	          (err) => {
	          	return o.error(err);
	          }
	        );
    });
  }

  public getRequestHeaders()
  {
  	return new HttpHeaders().set('Authorization', 'Bearer ' + window.localStorage.getItem('loginToken'));
  }

  public logout()
  {
  	window.localStorage.removeItem('loginToken');
  	this.isAuthenticated = false;	
  }


}
