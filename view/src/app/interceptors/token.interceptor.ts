import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { AuthService } from '../services/auth.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorDialogComponent } from '../components/modals/error-dialog/error-dialog.component';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public authService: AuthService, private router: Router,public dialog: MatDialog,
    private injector: Injector) { }

  errorAppeared = false;
  private handleError(err: HttpErrorResponse): Observable<any> {

    if (err.error instanceof Error) {
    } else {
      if(err.status!==201){
        if(this.errorAppeared==false){
          this.errorAppeared = true;
          const dialogRef = this.dialog.open(ErrorDialogComponent, {
            width: '500px',
            data: { title: err.error.name || err.error.message , message: 'Unable to send request, try again please', button:'OK' }
          });
        }
      }
    }
    if (err.status === 404 || err.status === 403) {
    }
    return throwError(err.error);
}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.errorAppeared = false;
    const loginData = JSON.parse(localStorage.getItem('currentUser'));
    if (loginData) {
      const clonedRequest = request.clone({
        setHeaders: {
          'x-access-token': JSON.parse(localStorage.getItem('currentUser')).token
        }
      })
      return next.handle(clonedRequest).pipe(catchError(err => this.handleError(err)));
    } else {
      return next.handle(request);
    }
  }
}
