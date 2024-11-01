import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Client } from '../../../models/Client';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientService } from '../../../services/client.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatOption, MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-owner-select',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatIconModule,
    MatOptionModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatOption,
  ],
  templateUrl: './owner-select.component.html',
  styleUrl: './owner-select.component.scss'
})
export class OwnerSelectComponent implements OnInit {
  @ViewChild('searchInput') searchInput!: ElementRef; // Référence au champ de recherche
  @Input() carForm!: FormGroup;
  @Output() clientCleared = new EventEmitter<void>(); // Événement pour notifier la suppression du client sélectionné

  clients: Client[] = [];
  filteredClients: Client[] = [];
  searchControl = new FormControl();

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.loadClients();
    this.searchControl.valueChanges.subscribe(() => this.filterClients());
  }

  loadClients(): void {
    this.clientService.getAll().subscribe({
      next: (data: Client[]) => {
        this.clients = data;
        this.filteredClients = this.clients;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des propriétaires:', error);
      },
    });
  }

  filterClients(): void {
    const search = this.searchControl.value?.toLowerCase() || '';
    this.filteredClients = search
      ? this.clients.filter(client =>
          client.firstName?.toLowerCase().includes(search) ||
          client.lastName?.toLowerCase().includes(search)
        )
      : this.clients;
  }

  getClientFullName(clientId: number | null): string {
    const client = this.clients.find(c => c.id === clientId);
    return client ? `${client.firstName} ${client.lastName}` : '';
  }

  clearClientSelection(event: Event): void {
    event.stopPropagation();
    this.carForm.get('clientId')?.setValue(null);
    this.searchControl.setValue('');
    this.filteredClients = this.clients;
    this.clientCleared.emit(); // Notifie le parent que le client est supprimé
  }

  onClientSelected(): void {
    this.searchControl.setValue('');
    this.filteredClients = this.clients;
  }

  openSelect(): void {
    this.searchControl.setValue('');
    this.filterClients();
    this.searchInput.nativeElement.focus(); // Focaliser l'input de recherche ici
  }
}