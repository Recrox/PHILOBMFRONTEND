import { Component, importProvidersFrom, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Client } from '../../../models/Client';
import { Car } from '../../../models/Car';
import { Service } from '../../../models/Service';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Invoice } from '../../../models/Invoice';
import { CarService } from '../../../services/car.service';
import { NotificationService } from '../../../notification.service';
import { InvoiceService } from '../../../services/invoice.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DATE_LOCALE, MatNativeDateModule, MatOption } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { OwnerSelectComponent } from '../../shared/owner-select/owner-select.component';
import { MatDatepickerModule } from '@angular/material/datepicker';

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
    OwnerSelectComponent
  ],
  providers: [
    // MatDatepickerModule,
    // { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' }, // Exemple de configuration pour le français
  ],
  templateUrl: './invoice-details.component.html',
  styleUrl: './invoice-details.component.scss'
})
export class InvoiceDetailsComponent implements OnInit {
  invoiceForm: FormGroup;
  clients: Client[] = [];
  cars: Car[] = [];
  services: Service[] = [];

  constructor(
    public dialogRef: MatDialogRef<InvoiceDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Invoice | null,
    private carService: CarService,
    private invoiceService: InvoiceService,
    private notificationService: NotificationService,
    private fb: FormBuilder
  ) {
    this.invoiceForm = this.fb.group({
      client: [null, Validators.required],
      car: [null, Validators.required],
      date: [new Date(), Validators.required],
      services: [[], Validators.required]
    });
  }

  ngOnInit(): void {
    this.invoiceService.getAll().subscribe((invoice) => (this.cars = invoice));
    
    if (this.data) {
      this.invoiceForm.patchValue(this.data);
    }
  }

  saveInvoice(): void {
    if (this.invoiceForm.valid) {
      const invoiceData: Invoice = this.invoiceForm.value;
      if (this.data && this.data.id) {
        // Update existing invoice
        // Update logic here (similar to CarDetailsComponent)
      } else {
        // Add new invoice
        // Add logic here (similar to CarDetailsComponent)
      }
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
