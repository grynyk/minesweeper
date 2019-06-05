import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRouting } from './app.routing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule, MatButtonModule, MatTooltipModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { GameAreaComponent } from './components/game-area/game-area.component';
import { MainComponent } from './components/main/main.component';
import { Page404Component } from './components/page-404/page-404.component';
import { GameService } from './services/game.service';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UsersService } from './services/users.service';
import { PasswordMatcherDirective } from './directives/password-match.directive';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NotificationDialogComponent } from './components/modals/notification-dialog/notification-dialog.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { RecordsService } from './services/records.service';
import { MatTableModule } from '@angular/material/table';
import { RecordsComponent } from './components/records/records.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ContentDialogComponent } from './components/modals/content-dialog/content-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    GameAreaComponent,
    MainComponent,
    Page404Component,
    PasswordMatcherDirective,
    NotificationDialogComponent,
    RecordsComponent,
    ContentDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatInputModule,
    ReactiveFormsModule,
    AppRouting,
    MatToolbarModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatTableModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    GameService,
    RecordsService,
    AuthGuard,
    AuthService,
    UsersService
  ],
  entryComponents: [
    ContentDialogComponent,
    NotificationDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
