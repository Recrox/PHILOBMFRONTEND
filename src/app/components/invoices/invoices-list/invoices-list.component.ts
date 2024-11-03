import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NotificationService } from '../../../notification.service';
import { Invoice } from '../../../models/Invoice';
import { InvoiceService } from '../../../services/invoice.service';
import { InvoiceDetailsComponent } from '../invoice-details/invoice-details.component';

@Component({
  selector: 'app-invoices-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    FormsModule,
    MatInputModule,
    MatPaginator,
    MatTableModule
  ],
  templateUrl: './invoices-list.component.html',
  styleUrls: ['./invoices-list.component.scss']
})
export class InvoicesListComponent implements OnInit {
  displayedColumns: string[] = ['id','client', 'car', 'date', 'services', 'actions'];
  invoices = new MatTableDataSource<Invoice>([]);
  searchTerm: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private invoiceService: InvoiceService,
    private dialog: MatDialog,
    private notificationService: NotificationService
  ) {
    this.configureInvoiceSearchFilter();
  }

  ngOnInit(): void {
    this.loadInvoices();
  }

  ngAfterViewInit() {
    this.invoices.paginator = this.paginator;
    this.invoices.sort = this.sort;
  }

  loadInvoices(): void {
    this.invoiceService.getMock().subscribe({
      next: (data: Invoice[]) => {
        this.invoices.data = data;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des factures:', error);
      },
    });
  }

  applyFilter(): void {
    const filterValue = this.searchTerm.trim().toLowerCase();
    this.invoices.filter = filterValue;
  }

  addInvoice(): void {
    this.openInvoiceDetails();
  }

  editInvoice(invoice: Invoice): void {
    this.openInvoiceDetails(invoice);
  }

  deleteInvoice(invoice: Invoice): void {
    const confirmation = confirm(`Êtes-vous sûr de vouloir supprimer la facture pour ${invoice.client?.firstName} ${invoice.client?.lastName} ?`);
    if (confirmation) {
      this.invoiceService.delete(invoice.id).subscribe({
        next: () => {
          this.loadInvoices();
        },
        error: (error) => {
          console.error('Erreur lors de la suppression de la facture:', error);
        },
      });
    }
  }

  printInvoice(invoice: Invoice): void {
    this.invoiceService.downloadPDF(invoice.id);
  }

  openInvoiceDetails(invoice?: Invoice): void {
    const dialogRef = this.dialog.open(InvoiceDetailsComponent, {
      data: invoice ? { ...invoice } : null,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadInvoices();
      }
    });
  }

  private configureInvoiceSearchFilter() {
    this.invoices.filterPredicate = (invoice: Invoice, filter: string): boolean => {
      const searchTerm = filter.toLowerCase().trim();

      // Extraire les informations nécessaires pour le filtrage
      const clientName = invoice.client 
        ? `${invoice.client.firstName?.toLowerCase()} ${invoice.client.lastName?.toLowerCase()}`
        : '';
      
      const carLicensePlate = invoice.car?.licensePlate?.toLowerCase() || '';
      const carMileage = invoice.car?.mileage?.toString() || '';

      // Vérifier si le filtre correspond à l'un des critères
      return (
        clientName.includes(searchTerm) ||
        carLicensePlate.includes(searchTerm) ||
        carMileage.includes(searchTerm) ||
        invoice.date.toString().includes(searchTerm) // Vous pouvez format la date selon vos besoins
      );
    };
}

}
