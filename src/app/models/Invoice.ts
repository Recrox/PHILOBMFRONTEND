import { AuditableEntity } from "./AuditableEntity";
import { Car } from "./Car";
import { Client } from "./Client";
import { Service } from "./Service";

export interface Invoice  extends AuditableEntity{
  client: Client;
  car: Car; 
  date: Date;
  services: Service[];
}
