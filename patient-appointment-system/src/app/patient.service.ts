import { Injectable } from '@angular/core';
import { Patient } from './patient';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private apiUrl = 'http://localhost:3000/patients';

  constructor(private http : HttpClient) { }

  createPatient(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(this.apiUrl , patient);
  }

  listsPatient(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.apiUrl).pipe(map((data:any) => data.data));
  }

  searchPatients(name: string): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.apiUrl}/search?name=${name}`);
  }

  getPatientById(id: string): Observable<Patient> {
    return this.http.get<Patient>(`${this.apiUrl}/${id}`);
  }
}
