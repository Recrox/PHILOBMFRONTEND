import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CarService } from '../../../services/car.service';
import { Car } from '../../../models/Car';
import { NotificationService } from '../../../notification.service';
import { MatOption } from '@angular/material/core';
import { ClientService } from '../../../services/client.service';
import { Client } from '../../../models/Client';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-car-details',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatOption,
    ReactiveFormsModule,
    MatSelectModule
  ],
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss']
})
export class CarDetailsComponent implements OnInit {
  @ViewChild('searchInput') searchInput!: ElementRef; // Référence au champ de recherche
  carForm: FormGroup; // Déclarez un FormGroup
  car: Car = {id: 0, brand: '', model: '', licensePlate: '', chassisNumber: '', mileage: 0, services: [] };
  clients: Client[] = [];
  filteredClients: Client[] = []; // Liste des clients filtrés
  searchTerm: string = ''; // Terme de recherche
  searchControl = new FormControl(); // Déclarez le FormControl pour la recherche

  constructor(
    public dialogRef: MatDialogRef<CarDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Car | null,
    private carService: CarService,
    private clientService: ClientService, 
    private notificationService: NotificationService,
    private fb: FormBuilder
  ) {
    this.carForm = this.fb.group({
      clientId: [null, Validators.required], // Contrôle pour le propriétaire
      brand: ['', Validators.required],
      model: ['', Validators.required],
      licensePlate: ['', Validators.required],
      chassisNumber: ['', Validators.required],
      mileage: [0, [Validators.required, Validators.min(0),Validators.max(2000000)]]
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.carForm.patchValue(this.data); // Remplissez le formulaire si des données sont fournies
    }
    this.loadClients(); // Chargez les clients
    this.searchControl.valueChanges.subscribe(() => this.filterClients()); // Écoutez les changements de valeur
  }

  loadClients(): void {
    this.clientService.getAll().subscribe({
      next: (data: Client[]) => {
        this.clients = data; // Mettez à jour la liste des clients
        this.filteredClients = this.clients; // Initialiser les clients filtrés
      },
      error: (error) => {
        console.error('Erreur lors du chargement des propriétaires:', error);
      },
    });
  }

  saveCar(): void {
    if (this.carForm.valid) {
      const carData: Car = this.carForm.value; // Récupérez les données du formulaire
      if (this.data && this.data.id) {
        // Mise à jour d'une voiture existante
        this.carService.update({ ...carData, id: this.data.id }).subscribe({
          next: () => {
            this.notificationService.showNotification('Voiture mise à jour avec succès!');
            this.dialogRef.close(carData);
          },
          error: (error) => {
            console.error('Erreur lors de la mise à jour de la voiture:', error);
            this.notificationService.showNotification('Erreur lors de la mise à jour de la voiture');
          },
        });
      } else {
        // Ajout d'une nouvelle voiture
        this.carService.create(carData).subscribe({
          next: (newCar) => {
            this.notificationService.showNotification('Voiture ajoutée avec succès!');
            this.dialogRef.close(newCar);
          },
          error: (error) => {
            console.error('Erreur lors de l\'ajout de la voiture:', error);
            this.notificationService.showNotification('Erreur lors de l\'ajout de la voiture');
          },
        });
      }
    }
  }

  filterClients(): void {
    const search = this.searchTerm.toLowerCase();
    this.filteredClients = this.clients.filter(client => 
      client.firstName?.toLowerCase().includes(search) || 
      client.lastName?.toLowerCase().includes(search)
    );
  }

  openSelect(): void {
    this.searchControl.setValue(''); // Réinitialiser le champ de recherche
    this.filterClients(); // Filtrer les clients
    setTimeout(() => this.searchInput.nativeElement.focus(), 0); // Donner le focus au champ de recherche
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
