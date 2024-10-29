import { Injectable } from '@angular/core';
import { BaseService } from './base.service'; // Importez le service de base
import { HttpClient } from '@angular/common/http';
import { Service } from '../models/Service'; // Assurez-vous que le chemin est correct

@Injectable({
  providedIn: 'root'
})
export class ServiceService extends BaseService<Service> {
  constructor(http: HttpClient) {
    super(http, 'services'); // Spécifiez le chemin relatif pour les services
  }
}
