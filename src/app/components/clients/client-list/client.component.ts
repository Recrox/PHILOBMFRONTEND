import { Component, OnInit, ViewChild } from '@angular/core';
import { Client } from '../../../models/Client';
import { ClientService } from '../../../services/client.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NotificationService } from '../../../notification.service';
import { ClientDetailsComponent } from '../client-details/client-details.component';

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
    MatDividerModule,
    MatLabel,
    MatFormField,
    FormsModule,
    MatInputModule
  ],
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'lastName', 'firstName', 'email', 'phone', 'actions'];
  clients = new MatTableDataSource<Client>([]); // Utilisez directement MatTableDataSource pour les fonctionnalités de tri et pagination
  searchTerm: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private clientService: ClientService,
    private dialog: MatDialog,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadClients();
  }

  ngAfterViewInit() {
    this.clients.paginator = this.paginator; // Associez paginator et sort directement à clients
    this.clients.sort = this.sort;
  }

  loadClients(): void {
    this.clientService.getAll().subscribe({
      next: (data: Client[]) => {
        this.clients.data = data; // Chargez les données directement dans MatTableDataSource
      },
      error: (error) => {
        console.error('Erreur lors du chargement des clients:', error);
      },
    });
  }

  applyFilter(): void {
    const filterValue = this.searchTerm.trim().toLowerCase();
    this.clients.filter = filterValue; // Appliquez le filtre directement sur MatTableDataSource
  }

  addClient(){
    this.openClientDetails();
  }

  editClient(client: Client): void {
    this.openClientDetails(client);
  }

  deleteClient(client: Client): void {
    const confirmation = confirm(`Êtes-vous sûr de vouloir supprimer le client ${client.firstName} ${client.lastName} ?`);
    if (confirmation) {
      this.clientService.delete(client.id).subscribe({
        next: () => {
          this.loadClients();
        },
        error: (error) => {
          console.error('Erreur lors de la suppression du client:', error);
        },
      });
    }
  }

  openClientDetails(client?: Client): void {
    const dialogRef = this.dialog.open(ClientDetailsComponent, {
      data: client ? { ...client } : null,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadClients(); // Recharge les clients après ajout ou mise à jour
      }
    });
  }
}