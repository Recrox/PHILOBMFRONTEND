import { Component, OnInit, ViewChild } from '@angular/core';
import { Client } from '../../models/Client';
import { ClientService } from '../../services/client.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ClientDetailsComponent } from '../../client-details/client-details.component';

@Component({
  selector: 'app-client',
  standalone: true,
  imports : [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule 
  ],
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent implements OnInit  {
  displayedColumns: string[] = ['id', 'lastName', 'firstName', 'email', 'phone', 'actions'];

  clients = new MatTableDataSource<Client>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private clientService: ClientService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.clientService.getAll().subscribe({
      next: (data: Client[]) => {
        this.clients.data = data;
        this.clients.paginator = this.paginator;
        this.clients.sort = this.sort;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des clients:', error);
      },
    });
  }

  editClient(client: Client): void {
    this.openClientDetails(client);
  }

  deleteClient(client: Client): void {
    const confirmation = confirm(`Êtes-vous sûr de vouloir supprimer le client ${client.firstName} ${client.lastName} ?`);
    
    if (confirmation) {
      this.clientService.delete(client.id).subscribe({
        next: () => {
          console.log('Client supprimé avec succès:', client);
          // Optionnel: Rechargez les clients pour mettre à jour la liste
          this.loadClients();
        },
        error: (error) => {
          console.error('Erreur lors de la suppression du client:', error);
        },
      });
    }
  }

  // Méthode pour ouvrir le dialog
  openClientDetails(client?: Client): void {
    const dialogRef = this.dialog.open(ClientDetailsComponent, {
      data: client ? { ...client } : null,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadClients(); // Rechargez les clients après ajout/mise à jour
      }
    });
  }
}
