import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment } from './appointment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiurl = 'http://localhost:3000/payment';

  constructor(private http: HttpClient) { }

  getPaymentById(appointment_id:string): Observable<any> {
    return this.http.get<any>(`${this.apiurl}/${appointment_id}`);
  }
}
