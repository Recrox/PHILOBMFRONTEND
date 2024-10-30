import { Component } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';
import { API_ENDPOINT } from './outils/endpoint.token';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

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
    MatListModule
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
}
