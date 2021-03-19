import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { User } from './auth/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'We Connect Bemol';

  authenticated$ : Observable<boolean>;
  user$: Observable<User>;

  constructor( 
    private AuthService: AuthService,
    private router: Router) {
    this.authenticated$ = this.AuthService.isAuthenticated();
    this.user$ = this.AuthService.getUser();
  }

  logout() {
    this.AuthService.logout();
    this.router.navigateByUrl('/auth/login');
  }

}
