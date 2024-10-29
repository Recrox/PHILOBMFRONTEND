import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment'; // Importez l'environnement
import { BaseEntity } from '../../models/BaseEntity';
import { API_ENDPOINT } from '../../outils/endpoint.token';

@Injectable({
  providedIn: 'root'
})
export class BaseService<T extends BaseEntity> {
  protected baseUrl: string = environment.apiUrl; // Utilisez l'URL de l'API à partir de l'environnement

  constructor(private http: HttpClient, @Inject(API_ENDPOINT) public endpoint: string) {
  }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(`${this.baseUrl}/${this.endpoint}`);
  }

  getById(id: number): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${this.endpoint}/${id}`);
  }

  create(entity: T): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${this.endpoint}`, entity);
  }

  update(entity: T): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${this.endpoint}/${entity['id']}`, entity); // Assurez-vous que l'ID est accessible
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${this.endpoint}/${id}`);
  }
}
