import { Injectable } from '@angular/core';
import { Appointment } from './appointment';
import { Observable, forkJoin, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PatientService } from './patient.service';


@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private apiurl = 'http://localhost:3000/appointments';

  constructor(private http: HttpClient, private patientService: PatientService) { }

  createAppointment(appointment: Appointment): Observable<Appointment> {
    return this.http.post<Appointment>(this.apiurl, appointment);
  }

  getAllAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.apiurl).pipe(map((data: any) => data.data));;
  }

  getAppointmentsForPatient(patientId: string): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.apiurl}/${patientId}/appointments`);
  }
}
