import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CarService } from '../../../services/car.service';
import { Car } from '../../../models/Car';
import { NotificationService } from '../../../notification.service';

@Component({
  selector: 'app-car-details',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatDialogModule
  ],
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss']
})
export class CarDetailsComponent implements OnInit {
  car: Car = {id: 0, brand: '', model: '', licensePlate: '', chassisNumber: '', mileage: 0, services: [] };

  constructor(
    public dialogRef: MatDialogRef<CarDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Car | null,
    private carService: CarService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.car = { ...this.data };
    }
  }

  saveCar(): void {
    if (this.car.id) {
      // Mise à jour d'une voiture existante
      this.carService.update(this.car).subscribe({
        next: () => {
          this.notificationService.showNotification('Voiture mise à jour avec succès!');
          this.dialogRef.close(this.car);
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour de la voiture:', error);
          this.notificationService.showNotification('Erreur lors de la mise à jour de la voiture');
        },
      });
    } else {
      // Ajout d'une nouvelle voiture
      this.carService.create(this.car).subscribe({
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

  cancel(): void {
    this.dialogRef.close();
  }
}
