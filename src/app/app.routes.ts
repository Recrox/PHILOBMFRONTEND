import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ClientComponent } from './components/client/client.component';
import { CarComponent } from './components/car/car.component';
import { InvoiceComponent } from './components/invoice/invoice.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'client', component: ClientComponent },
  { path: 'car', component: CarComponent },
  { path: 'invoice', component: InvoiceComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
