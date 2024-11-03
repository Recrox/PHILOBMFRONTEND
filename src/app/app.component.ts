import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';
import { API_ENDPOINT } from './outils/endpoint.token';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { AuthService } from './services/authService';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [
    { provide: API_ENDPOINT, useValue: environment.apiUrl } // Mettez ici l'URL de votre API
  ],
  
})
export class AppComponent {
  title = 'PHILOBMFront';
  currentYear: number = new Date().getFullYear();

  constructor(public authService: AuthService, private router: Router) {}

  login() {
    // this.authService.login();
    this.router.navigate(['/login']); // Redirigez vers la page d'accueil après connexion
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']); // Redirigez vers la page d'accueil après connexion
  }
}
