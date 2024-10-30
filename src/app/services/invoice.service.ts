import { Injectable } from '@angular/core';
import { BaseService } from './base/base.service'; // Importez le service de base
import { HttpClient } from '@angular/common/http';
import { Invoice } from '../models/Invoice';
import { Observable } from 'rxjs';
import { saveAs } from 'file-saver-es';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService extends BaseService<Invoice> {
  constructor(http: HttpClient) {
    super(http, 'invoice'); // Spécifiez le chemin relatif pour les factures
  }

  CreerPDFAsync(invoiceId: number): Observable<Blob> {
    // Modifiez le type de retour pour correspondre à un fichier PDF
    return this.http.get<Blob>(`${this.baseUrl}/${this.endpoint}/pdf/${invoiceId}`, { responseType: 'blob' as 'json' });
  }

  // Nouvelle méthode pour gérer le téléchargement
  downloadPDF(invoiceId: number): void {
    this.CreerPDFAsync(invoiceId).subscribe(
      (pdfBlob: Blob) => {
        const fileName = `invoice_${invoiceId}.pdf`; // Nom du fichier
        saveAs(pdfBlob, fileName); // Utilisation de file-saver pour télécharger le fichier
      },
      error => {
        console.error('Erreur lors du téléchargement du PDF', error);
      }
    );
  }

  getMock(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(`${this.baseUrl}/${this.endpoint}/mock`);
  }
}
