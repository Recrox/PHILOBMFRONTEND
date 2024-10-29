import { Injectable } from '@angular/core';
import { BaseService } from './base/base.service'; // Importez le service de base
import { HttpClient } from '@angular/common/http';
import { Client } from '../models/Client';

@Injectable({
  providedIn: 'root'
})
export class ClientService extends BaseService<Client> {
  constructor(http: HttpClient) {
    super(http, 'client'); // Spécifiez le chemin relatif pour les clients
  }
}
