// src/app/core/services/applications.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Application, AddApplicationDto } from '../models/application.model';

@Injectable({
  providedIn: 'root'
})
export class ApplicationsService {
  private http = inject(HttpClient);
  private api = environment.apiUrl + '/applications';

  /**
   * Get all applications for a user
   */
  getApplications(userId: number): Observable<Application[]> {
    return this.http.get<Application[]>(`${this.api}?userId=${userId}`);
  }

  /**
   * Get a single application by ID
   */
  getApplication(id: number): Observable<Application> {
    return this.http.get<Application>(`${this.api}/${id}`);
  }

  /**
   * Check if user already applied to a job
   */
  checkIfApplied(userId: number, offerId: string): Observable<Application[]> {
    return this.http.get<Application[]>(`${this.api}?userId=${userId}&offerId=${offerId}`);
  }

  /**
   * Add a new application
   */
  addApplication(application: AddApplicationDto): Observable<Application> {
    const newApplication = {
      ...application,
      status: 'pending' as const,
      notes: '',
      dateAdded: new Date().toISOString()
    };
    return this.http.post<Application>(this.api, newApplication);
  }

  /**
   * Update application status
   */
  updateApplicationStatus(id: number, status: Application['status']): Observable<Application> {
    return this.http.patch<Application>(`${this.api}/${id}`, { status });
  }

  /**
   * Update application notes
   */
  updateApplicationNotes(id: number, notes: string): Observable<Application> {
    return this.http.patch<Application>(`${this.api}/${id}`, { notes });
  }

  /**
   * Delete an application
   */
  deleteApplication(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
