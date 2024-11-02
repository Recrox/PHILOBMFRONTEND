import { AuditableEntity } from "./AuditableEntity";
import { Car } from "./Car";
import { Client } from "./Client";
import { Service } from "./Service";

export interface Invoice  extends AuditableEntity{
  clientId:number;
  client: Client;
  carId:number;
  car: Car; 
  date: Date;
  services: Service[];
}
