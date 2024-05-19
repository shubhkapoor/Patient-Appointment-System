import { Component, OnInit } from '@angular/core';
import { PatientService } from '../patient.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-create',
  templateUrl: './patient-create.component.html',
  styleUrls: ['./patient-create.component.css']
})
export class PatientCreateComponent {

  name: string = '';
  mobile: string = '';
  email: string = '';

  constructor(private patientService: PatientService, private router: Router) { }

  createPatient() {

    if (this.name === "" || this.name === "" || this.email === "") {

      alert("Enter all fields!!")

      return;
    }

    this.patientService.createPatient({ id: "", name: this.name, mobile: this.mobile, email: this.email }).subscribe(() => {
      console.log("Patient created successfully");

      this.router.navigate(['/']).then(nav => {
        window.alert('Patient created Successfully!!!');
      }, err => {
        console.log(err);
      });
    });
  }

}
