import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../../models/user';
import { UsersService } from '../../../services/users.service';
import { Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User;

  public currentDate = new Date();
  public minBirthdate = this.currentDate.setFullYear(this.currentDate.getFullYear()-18);
  constructor(private router: Router,
    private authService: AuthService, private usersService: UsersService) {
  }

  error: boolean = false;
  errorMessage: String;
  loading = false;
  Submit() {
    console.log(this.user);
    this.loading = true;
    this.usersService.createUser(this.user)
      .subscribe(
        data => {
          this.router.navigate(['/login']);
        },
        error => {
          this.error = true;
          if(error.status==409){
            this.errorMessage = error.error;
          }else{
            this.errorMessage = error.status + ' ' + 'Server is not responding';
          }
          this.loading = false;
        });
  }


  username = new FormControl('', [Validators.required]);

  getErrorMessage() {
    return this.username.hasError('required') ? 'You must enter a value' : '';
  }
  ngOnInit() {
    this.user = new User();
    this.authService.logout();
  }
}
