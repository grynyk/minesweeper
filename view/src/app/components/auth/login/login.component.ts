import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { AuthService } from '../../../services/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error = false;
  success = false;
  username: string;
  password: string;
  matcher = new MyErrorStateMatcher();
  loading = false;
  notificationMessage: string;
  returnUrl: string;
  passowrdFormControl = new FormControl('', [
    Validators.required,
  ]);
  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService, private snackBar: MatSnackBar) {
  }

  Login() {
    this.loading = true;
    this.authService.login(this.username, this.password)
      .subscribe(
        data => {
          this.loading = false;
          this.openSnackBar('Welcome! Successfully loginned', 'CLOSE')
          setTimeout(() => {
            this.router.navigate([this.returnUrl]);
          }, 400);

        },
        error => {
          this.error = true;
          this.loading = false;
          this.notificationMessage = error.status + ' ' + error.error.message;
        });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  ngOnInit() {
    this.authService.logout();
    this.returnUrl = this.route.snapshot.queryParams[this.returnUrl] || '/';
  }
}
