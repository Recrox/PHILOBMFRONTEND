import { Component, Inject, OnInit } from '@angular/core';
import { Client } from '../models/Client';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ClientService } from '../services/client.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-client-details',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule
  ],
  templateUrl: './client-details.component.html',
  styleUrl: './client-details.component.scss'
})
export class ClientDetailsComponent implements OnInit {
  client: Client = { id: 0, firstName: '', lastName: '', email: '', phone: '', cars: [] };

  constructor(
    public dialogRef: MatDialogRef<ClientDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Client | null,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.client = { ...this.data };
    }
  }

  saveClient(): void {
    if (this.client.id) {
      // Update existing client
      this.clientService.update(this.client).subscribe({
        next: () => {
          console.log('Client mis à jour:', this.client);
          this.dialogRef.close(this.client);
        },
        error: (error) => console.error('Erreur lors de la mise à jour du client:', error),
      });
    } else {
      // Add new client
      this.clientService.create(this.client).subscribe({
        next: (newClient) => {
          console.log('Client ajouté:', newClient);
          this.dialogRef.close(newClient);
        },
        error: (error) => console.error('Erreur lors de l\'ajout du client:', error),
      });
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}