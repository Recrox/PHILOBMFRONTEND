import { Component, OnInit } from '@angular/core';
import { Client } from '../../models/Client';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-client',
  standalone: true,
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'] // Correction du nom du champ styleUrl à styleUrls
})
export class ClientComponent implements OnInit {
  clients: Client[] = []; // Liste des clients

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    // this.loadClients(); // Chargez les clients lors de l'initialisation du composant
  }

  // loadClients(): void {
  //   this.clientService.getAll().subscribe({
  //     next: (data: Client[]) => {
  //       this.clients = data; // Assignez la liste des clients récupérés
  //     },
  //     error: (error) => {
  //       console.error('Erreur lors du chargement des clients:', error);
  //     }
  //   });
  // }
  
}
