import { Component } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';
import { API_ENDPOINT } from '../environments/endpoint.token';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [
    { provide: API_ENDPOINT, useValue: environment.apiUrl } // Mettez ici l'URL de votre API
  ],
  
})
export class AppComponent {
  title = 'PHILOBMFront';
}
