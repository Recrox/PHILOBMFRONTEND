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
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { OwnerSelectComponent } from '../../shared/owner-select/owner-select.component';

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
    MatSelectModule,
    MatIconModule,
    OwnerSelectComponent
  ],
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss']
})
export class CarDetailsComponent implements OnInit {
  carForm: FormGroup; // Déclarez un FormGroup
  car: Car = {id: 0, brand: '', model: '', licensePlate: '', chassisNumber: '', mileage: 0, services: [] };

  constructor(
    public dialogRef: MatDialogRef<CarDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Car | null,
    private carService: CarService,
    private notificationService: NotificationService,
    private fb: FormBuilder
  ) {
    this.carForm = this.fb.group({
      clientId: [null], // Contrôle pour le propriétaire
      brand: [''],
      model: [''],
      licensePlate: [''],
      chassisNumber: [''],
      mileage: [0, [Validators.required, Validators.min(0),Validators.max(2000000)]]
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.carForm.patchValue(this.data); // Remplissez le formulaire si des données sont fournies
    }
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

  onClientCleared(): void {
    // Actions à entreprendre lorsque le client est supprimé, si nécessaire
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
