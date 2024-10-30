import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { Contact } from '../../../models/Contact';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule,MatLabel,MatFormField],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  contact: Contact = {
    name: '',
    email: '',
    message: '',
  };

  constructor() {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      // Ici, vous pouvez gérer l'envoi des données du formulaire
      console.log('Formulaire soumis', this.contact);

      // Remise à zéro du formulaire
      form.reset();
      this.contact = { name: '', email: '', message: '' }; // Réinitialiser les champs du contact
    } else {
      console.log('Formulaire invalide');
    }
  }
}


