import { Injectable } from '@angular/core';
import { BaseService } from './base.service'; // Importez le service de base
import { HttpClient } from '@angular/common/http';
import { Car } from '../models/Car';

@Injectable({
  providedIn: 'root'
})
export class CarService extends BaseService<Car> {
  constructor(http: HttpClient) {
    super(http, 'cars'); // Spécifiez le chemin relatif pour les voitures
  }
}


