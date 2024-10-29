import { Injectable } from '@angular/core';
import { BaseService } from './base/base.service'; // Importez le service de base
import { HttpClient } from '@angular/common/http';
import { Car } from '../models/Car';

@Injectable({
  providedIn: 'root'
})
export class CarService extends BaseService<Car> {
  constructor(http: HttpClient) {
    super(http, 'car'); // Spécifiez le chemin relatif pour les voitures
  }
}


