import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root' // Ce service peut être utilisé dans toute l'application
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  showNotification(message: string, duration: number = 4000) {
    this.snackBar.open(message, 'Fermer', {
      duration,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['notification-snackbar'], // Classe CSS personnalisée pour le style
    });
  }
}
