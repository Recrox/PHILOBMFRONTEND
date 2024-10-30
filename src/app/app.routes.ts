import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { InvoiceComponent } from './components/invoices/invoice/invoice.component';
import { ClientComponent } from './components/clients/client-list/client.component';
import { CarsListComponent } from './components/cars/cars-list/cars-list.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'client', component: ClientComponent },
  { path: 'car', component: CarsListComponent },
  { path: 'invoice', component: InvoiceComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
