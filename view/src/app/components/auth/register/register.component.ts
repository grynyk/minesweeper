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
  username = new FormControl('', [Validators.required]);
  error = false;
  errorMessage: string;
  loading = false;

  constructor(private router: Router, private authService: AuthService, private usersService: UsersService) {
  }

  ngOnInit() {
    this.user = new User();
    this.authService.logout();
  }

  Submit() {
    this.loading = true;
    this.usersService.createUser(this.user)
      .subscribe(res => {
          this.router.navigate(['/login']);
        }, error => {
          this.error = true;
          this.errorMessage = error.status + ' ' + error.error;
          this.loading = false;
        });
  }

  getErrorMessage() {
    return this.username.hasError('required') ? 'You must enter a value' : '';
  }
}
