import { Component, OnInit } from '@angular/core';
import { Appointment } from '../appointment';
import { AppointmentService } from '../appointment.service';
import { PatientService } from '../patient.service';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {

  appointments: any[] = [];
  patientId : string = '';

  constructor(private appointmentService : AppointmentService, private patientService : PatientService) {}

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments() {
    this.appointmentService.getAllAppointments().subscribe(appointments=>{
      this.appointments = appointments;
      this.getAppointmentPatientNames();
    });
  }
  

  getAppointmentPatientNames() {
    this.appointments.forEach(appointment=>{
      this.patientService.getPatientById(appointment.patient_id).subscribe(patient => {
        appointment.patientName = patient.name;
      })
    })
  }



}
