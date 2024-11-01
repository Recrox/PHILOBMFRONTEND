import { AuditableEntity } from "./AuditableEntity";
import { Car } from "./Car";


export interface Client extends AuditableEntity {
  lastName?: string;
  firstName?: string;
  address?: string;
  phone?: string;
  email?: string;
  cars: Car[];
}
