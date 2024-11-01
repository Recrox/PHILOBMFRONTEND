import { Injectable } from '@angular/core';
import { BaseService } from './base/base.service'; // Importez le service de base
import { HttpClient } from '@angular/common/http';
import { Car } from '../models/Car';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService extends BaseService<Car> {
  constructor(http: HttpClient) {
    super(http, 'car'); // Spécifiez le chemin relatif pour les voitures
  }

  // Méthode pour récupérer toutes les voitures avec les clients associés
  public getAllCarsWithClient(): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.baseUrl}/${this.endpoint}/cars-client`);
  }
}


