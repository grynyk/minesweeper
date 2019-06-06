import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { AuthService } from '../services/auth.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationDialogComponent } from '../components/modals/notification-dialog/notification-dialog.component';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public authService: AuthService, public dialog: MatDialog) { }

  errorAppeared = false;
  private handleError(err: HttpErrorResponse): Observable<any> {

    if (err.error instanceof Error) {

    } else {
        if (this.errorAppeared === false) {
          this.errorAppeared = true;
          this.dialog.open(NotificationDialogComponent, {
            width: '500px',
            data: { title: err.error.name || err.error.message , message: 'Unable to send request, try again please' }
          });
        }
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
      });
      return next.handle(clonedRequest).pipe(catchError(err => this.handleError(err)));
    } else {
      return next.handle(request);
    }
  }
}
