import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../../../shared/models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output() onSubmit = new EventEmitter<User>();

	private users: User[] = [];

  private newUser: User = new User();

  constructor(private authService: AuthService,
  			  private router: Router,
  			  private http: HttpClient,) {
  }

  submitUser(user: User) {
    
      this.authService.addUser(user)
        .subscribe(
          user => {
            this.users.push(user);}
           /* this.router.navigateByUrl('/login');
          },
          (err: HttpErrorResponse) => {
            alert(`${err.error.error}`);
          }*/
          /*() => {
          this.router.navigateByUrl('/movies');
        },
        (err: HttpErrorResponse) => {
          alert(`${err.error.error}`);
        }*/
        );

   }

  /*register(name, email, password)
  {
  	return new Observable((o: Observer<any>) => {
      this.http.post('http://localhost:8000/api/register', {
        'name': name,
        'email': email,
        'password': password,
        
      },
      {
        headers: this.authService.getRequestHeaders(),
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
  }*/

  

 /* register(name, email, password)
  {
    this.authService.register(name, email, password)
      .subscribe(
        () => {
          this.router.navigateByUrl('/login');
        },
        (err: HttpErrorResponse) => {
          alert(`${err.error.error}`);
        }
      );
  }
*/
  ngOnInit() {
    this.router.navigate(['/login']);
  }

}


