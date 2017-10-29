import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

   constructor(private authService: AuthService,
  			  private router: Router) {
  }

  login(email, password)
  {
  	this.authService.login(email, password)
  		.subscribe(
  			() => {
  				this.router.navigateByUrl('/movies');
  			},
		    (err: HttpErrorResponse) => {
		    	alert(`${err.error.error}`);
		    }
  		);
  }


  ngOnInit() {
  }

}
