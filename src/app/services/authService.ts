import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { environment } from "../../environments/environment";
import { LoginRequest } from "../models/LoginRequest";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl; // Remplacez par l'URL de votre API
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  login(loginRequest: LoginRequest): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Auth/login`, loginRequest).pipe(
      tap(response => {
        console.log(response);
        
        localStorage.setItem('authToken', response.token);
        this.isAuthenticatedSubject.next(true);
      })
    );
  }

  logout() {
    localStorage.removeItem('authToken');
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }
}
