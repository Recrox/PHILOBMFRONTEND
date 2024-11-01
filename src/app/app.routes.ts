import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ClientListComponent } from './components/clients/client-list/client.component';
import { CarsListComponent } from './components/cars/cars-list/cars-list.component';
import { InvoicesListComponent } from './components/invoices/invoices-list/invoices-list.component';
import { NotFoundComponent } from './components/shared/not-found/not-found.component';
import { PrivacyPolicyComponent } from './components/footer/privacy-policy/privacy-policy.component';
import { TermsOfServiceComponent } from './components/footer/terms-of-service/terms-of-service.component';
import { ContactComponent } from './components/footer/contact/contact.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'client', component: ClientListComponent },
  { path: 'car', component: CarsListComponent },
  { path: 'invoice', component: InvoicesListComponent },
  { path: 'privacy', component: PrivacyPolicyComponent },
  { path: 'terms', component: TermsOfServiceComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', component: NotFoundComponent },  // Route 404
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
