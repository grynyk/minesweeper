import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { AuthService } from '../../../services/auth.service';

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
  error:boolean = false;
  success = false;
  username: string;
  password: string;
  matcher = new MyErrorStateMatcher();
  loading = false;
  notificationMessage:string;
  returnUrl: string;
  passowrdFormControl = new FormControl('', [
    Validators.required,
  ]);
  constructor(private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService) {
  }

  Login() {
    this.loading = true;
    this.authService.login(this.username,this.password)
        .subscribe(
            data => {
              this.loading = false;
              this.success = true;
              this.notificationMessage = 'Welcome! Successfully loginned'
              setTimeout(() =>{ 
                this.router.navigate([this.returnUrl]);
            }, 500);

            },
            error => {
              this.error = true;
              if(error.status==401){
                this.notificationMessage = error.status + ' ' + error.error.message;
              }else{
                this.notificationMessage = error.status + ' ' + 'Server does not respond';
              }
              this.loading = false;
            });
  }
  
  ngOnInit() {
    this.authService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

}
