import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from '../patient.service';
import { Patient } from '../patient';
import { AppointmentService } from '../appointment.service';
import { Appointment } from '../appointment';

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.css']
})
export class PatientDetailComponent implements OnInit {
  patient: any;
  appointments: Appointment[] = [];

  constructor(private route: ActivatedRoute, private patientService: PatientService, private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const patient_id = params.get('id');
      console.log(patient_id);

      if (patient_id) {
        this.patientService.getPatientById(patient_id).subscribe(result => {
          // console.log("Patient=> " + JSON.stringify(result));
          this.patient = result;

          this.loadAppointments(patient_id)
        });
      }
    });
  }

  loadAppointments(patient_id: string) {
    this.appointmentService.getAppointmentsForPatient(patient_id).subscribe(appointments => {
      this.appointments = appointments;
      console.log(appointments);
    })
  }
}
