import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../appointment.service';
import { Router } from '@angular/router';
import { PatientService } from '../patient.service';
import { Patient } from '../patient';

@Component({
  selector: 'app-appointment-create',
  templateUrl: './appointment-create.component.html',
  styleUrls: ['./appointment-create.component.css']
})
export class AppointmentCreateComponent implements OnInit {

  patients: Patient[] = [];
  selectedPatientId: string = '';
  patient_id: string = '';
  appointment_date_time: string = '';
  notes: string = '';

  constructor(private appointmentService: AppointmentService, private patientService: PatientService, private router: Router) { }

  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients() {
    this.patientService.listsPatient().subscribe(patients => {
      this.patients = patients;
    });
  }

  createAppointment() {

    if (this.selectedPatientId === "" || this.appointment_date_time === "" || this.notes === "") {
      alert("Enter all fields!!!");
      return;
    }

    const appointment = {
      id: "",
      patient_id: this.selectedPatientId,
      appointment_date_time: this.appointment_date_time,
      notes: this.notes
    }

    this.appointmentService.createAppointment(appointment).subscribe(() => {
      console.log('Appointment created successfully');
      this.router.navigate(['/']).then(nav => {
        window.alert('Appointment created Successfully!!!');
      }, err => {
        console.log(err);
      });
    });
  }

}
