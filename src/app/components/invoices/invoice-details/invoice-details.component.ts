import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Service } from '../../../models/Service';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Invoice } from '../../../models/Invoice';
import { NotificationService } from '../../../notification.service';
import { InvoiceService } from '../../../services/invoice.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, MatOption } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { OwnerSelectComponent } from '../../shared/owner-select/owner-select.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CarSelectComponent } from '../../shared/car-select/car-select.component';

@Component({
  selector: 'app-invoice-details',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatOption,
    ReactiveFormsModule,
    MatSelectModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    OwnerSelectComponent,
    CarSelectComponent
  ],
  providers: [
    //config date dans main.ts...
  ],
  templateUrl: './invoice-details.component.html',
  styleUrl: './invoice-details.component.scss'
})
export class InvoiceDetailsComponent implements OnInit {
  invoiceForm: FormGroup;
  services:Service[] = []

  constructor(
    public dialogRef: MatDialogRef<InvoiceDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Invoice | null,
    private invoiceService: InvoiceService,
    private notificationService: NotificationService,
    private fb: FormBuilder
  ) {
    this.invoiceForm = this.fb.group({
      clientId: [null],
      carId: [null],
      date: [new Date(), Validators.required,],
      // services: [[]]
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.invoiceForm.patchValue(this.data); // Remplissez le formulaire si des données sont fournies
    }
  }

  saveInvoice(): void {
    if (this.invoiceForm.valid) {
      const invoiceData: Invoice = this.invoiceForm.value; // Récupérez les données du formulaire
      console.log(invoiceData);
      
      if (this.data && this.data.id) {
        // Mise à jour d'une facture existante
        this.invoiceService.update({ ...invoiceData, id: this.data.id }).subscribe({
          next: () => {
            this.notificationService.showNotification('Facture mise à jour avec succès!');
            this.dialogRef.close(invoiceData);
          },
          error: (error) => {
            console.error('Erreur lors de la mise à jour de la facture:', error);
            this.notificationService.showNotification('Erreur lors de la mise à jour de la facture');
          },
        });
      } else {
        // Ajout d'une nouvelle facture
        this.invoiceService.create(invoiceData).subscribe({
          next: (newInvoice) => {
            this.notificationService.showNotification('Facture ajoutée avec succès!');
            this.dialogRef.close(newInvoice);
          },
          error: (error) => {
            console.error('Erreur lors de l\'ajout de la facture:', error);
            this.notificationService.showNotification('Erreur lors de l\'ajout de la facture');
          },
        });
      }
    }
  }
  

  onClientCleared(): void {
    // Actions à entreprendre lorsque le client est supprimé, si nécessaire
  }

  onCarCleared(): void {
    // Actions à entreprendre lorsque le client est supprimé, si nécessaire
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
