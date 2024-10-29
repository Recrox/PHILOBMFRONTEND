import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app.routes";
import { ClientComponent } from "./components/client/client.component";
import { CarComponent } from "./components/car/car.component";
import { InvoiceComponent } from "./components/invoice/invoice.component";


@NgModule({
  declarations: [
    AppComponent,
    ClientComponent,
    CarComponent,
    InvoiceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, // Ajoutez le module de routage ici
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
