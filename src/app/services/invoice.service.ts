import { Injectable } from '@angular/core';
import { BaseService } from './base/base.service'; // Importez le service de base
import { HttpClient } from '@angular/common/http';
import { Invoice } from '../models/Invoice';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService extends BaseService<Invoice> {
  constructor(http: HttpClient) {
    super(http, 'invoice'); // Spécifiez le chemin relatif pour les factures
  }
}
