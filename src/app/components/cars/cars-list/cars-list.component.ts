import { Component, OnInit, ViewChild } from '@angular/core';
import { Car } from '../../../models/Car';
import { CarService } from '../../../services/car.service';
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
import { CarDetailsComponent } from '../car-details/car-details.component';

@Component({
  selector: 'app-cars-list',
  standalone: true,
  imports: [
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
    MatInputModule,
  ],
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.scss']
})
export class CarsListComponent implements OnInit {
  displayedColumns: string[] = ['brand', 'model', 'licensePlate', 'chassisNumber', 'mileage', 'client', 'actions'];
  cars = new MatTableDataSource<Car>([]);
  searchTerm: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private carService: CarService,
    private dialog: MatDialog,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadCars();
  }

  ngAfterViewInit() {
    this.cars.paginator = this.paginator;
    this.cars.sort = this.sort;
  }

  loadCars(): void {
    this.carService.getAll().subscribe({
      next: (data: Car[]) => {
        this.cars.data = data;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des voitures:', error);
      },
    });
  }

  applyFilter(): void {
    const filterValue = this.searchTerm.trim().toLowerCase();
    this.cars.filter = filterValue;
  }

  addCar(){
    this.openCarDetails();
  }
  editCar(car: Car): void {
    this.openCarDetails(car);
  }

  deleteCar(car: Car): void {
    const confirmation = confirm(`Êtes-vous sûr de vouloir supprimer la voiture ${car.brand} ${car.model} ?`);
    if (confirmation) {
      this.carService.delete(car.id).subscribe({
        next: () => {
          this.loadCars();
        },
        error: (error) => {
          console.error('Erreur lors de la suppression de la voiture:', error);
        },
      });
    }
  }

  openCarDetails(car?: Car): void {
    const dialogRef = this.dialog.open(CarDetailsComponent, {
      data: car ? { ...car } : null,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadCars();
      }
    });
  }
}
