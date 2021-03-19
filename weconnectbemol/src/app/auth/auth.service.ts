import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly url = 'http://localhost:3000/auth';

  private subjUser$: BehaviorSubject<User> = new BehaviorSubject(null);
  private subjLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private http: HttpClient) { }

  register(user: User): Observable<User>{
    return this.http.post<User>(`${this.url}/register`, user);
  }

  login(credenciais: {email: string, senha: string}): Observable<User> {
    return this.http.post<User>(`${this.url}/login`, credenciais)
    .pipe(
      tap((u: User) => {
        localStorage.setItem('token', u.token);
        this.subjLoggedIn$.next(true);
        this.subjUser$.next(u);
      })
    )
  }

  isAuthenticated(): Observable<boolean> {
    const token = localStorage.getItem('token');
    if(token && this.subjLoggedIn$.value) {
      return this.checkTokenValidation();
    }
    return this.subjLoggedIn$.asObservable();
  }

  checkTokenValidation(): Observable<boolean> {
    return this.http
    .get<User>(`${this.url}/user`)
    .pipe(
      tap((u: User) => {
        if(u){
          localStorage.setItem('token', u.token);
          this.subjLoggedIn$.next(true);
          this.subjUser$.next(u);
        }
      }),
      map((u: User) => (u)?true:false),
        catchError((err) => {
          this.logout();
          return of(false);
        })
    );
  }

  getUser(): Observable<User>{
    return this.subjUser$.asObservable();
  }

  logout() {
    localStorage.removeItem('token');
    this.subjLoggedIn$.next(false);
    this.subjUser$.next(null);
  }
}
