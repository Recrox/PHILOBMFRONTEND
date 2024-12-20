import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotificationService } from '../../../notification.service';
import { CarService } from '../../../services/car.service';
import { Car } from '../../../models/Car';
import { MatOption, MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-car-select',
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
  templateUrl: './car-select.component.html',
  styleUrl: './car-select.component.scss'
})
export class CarSelectComponent implements OnInit {
  @ViewChild('searchInput') searchInput!: ElementRef; // Référence au champ de recherche
  @Input() carForm!: FormGroup;
  @Output() carCleared = new EventEmitter<void>(); // Événement pour notifier la suppression du client sélectionné

  cars: Car[] = [];
  searchControl = new FormControl();
  filteredCars: Car[] = [];
  
  constructor(
    private carService: CarService,
  ) {

  }

  ngOnInit(): void {
    // Logic to initialize the component (e.g., loading clients)
    this.loadCars();
  }

  loadCars() {
    // Chargez les clients ici
    this.carService.getAll().subscribe(cars => {
      this.cars = cars;
      this.filteredCars = cars;
    });
  }

  filterCars(): void {
    const search = this.searchControl.value?.toLowerCase() || '';
    this.filteredCars = search
      ? this.cars.filter(car =>
        car.brand?.toLowerCase().includes(search) ||
        car.model?.toLowerCase().includes(search)
        )
      : this.cars;
  }

  getCarFullName(carId: number): string {
    const car = this.cars.find(c => c.id === carId);
    return car ? `${car.model} ${car.brand}` : 'Aucune voitures sélectionné';
  }

  clearCarSelection(event: MouseEvent) {
    event.stopPropagation();
    this.carForm.get('carId')?.reset();
    this.searchControl.setValue('');
    this.filteredCars = this.cars;
    this.carCleared.emit(); // Notifie le parent que le client est supprimé
  }

  onCarSelected() {
    this.searchControl.setValue('');
    this.filteredCars = this.cars;
  }

  openSelect(): void {
    this.searchControl.setValue('');
    this.filterCars();
    this.searchInput.nativeElement.focus(); // Focaliser l'input de recherche ici
  }
}