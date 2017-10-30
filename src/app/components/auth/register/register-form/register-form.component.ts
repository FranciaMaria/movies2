import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../../../shared/services/auth.service';
import { User } from '../../../../shared/models/user.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

 @Output() onSubmit = new EventEmitter<User>();

  //private users: User[] = [];

  private newUser: User = new User();

  constructor(private authService: AuthService,
  			  private router: Router,
  			  //private http: HttpClient,
  			  ) {
  }

  submitUser(user: User) {
    this.onSubmit.emit(user);
    this.authService.addUser(user)
        .subscribe(
          user => {
            //this.users.push(user);
            this.router.navigateByUrl('/login');
          },
          (err: HttpErrorResponse) => {
            alert(`${err.error.error}`);
          });
    this.newUser = new User();
  }


  ngOnInit() {
  }

}
