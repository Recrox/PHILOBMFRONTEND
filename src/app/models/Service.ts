import { AuditableEntity } from "./AuditableEntity";
import { Car } from "./Car";

export interface Service extends AuditableEntity {
  description?: string;
  price: number;
  units: number;
  carId?: number; // Clé étrangère
  car?: Car; // Référence à la voiture associée


}
