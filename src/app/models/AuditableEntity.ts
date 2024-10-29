import { BaseEntity } from "./BaseEntity";



export interface AuditableEntity extends BaseEntity {
  createdBy?: string; // Utilisateur qui a créé l'entité
  createdDate?: Date ;
  modifiedBy?: string; // Utilisateur qui a modifié l'entité
  modifiedDate?: Date | null; // Date de la dernière modification
}
