import { AuditableEntity } from "./AuditableEntity";
import { Client } from "./Client";
import { Service } from "./Service";



export interface Car extends AuditableEntity {
  brand?: string; // Marque de la voiture
  model?: string; // Modèle de la voiture
  licensePlate?: string; // Numéro de plaque d'immatriculation
  chassisNumber?: string; // Numéro de châssis
  mileage?: number; // Kilométrage
  services: Service[] ;

  clientId?: number; // Clé étrangère vers Client
  client?: Client; // Propriétaire
}





