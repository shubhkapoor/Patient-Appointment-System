import { Component, OnInit } from '@angular/core';
import { Patient } from '../patient';
import { PatientService } from '../patient.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {

  patients: Patient[] = [];
  filteredPatients: Patient[] = [];
  searchQuery: string = "";

  constructor(private patientService: PatientService) { }

  ngOnInit(): void {
    this.getPatientList();
  }

  getPatientList() {
    this.patientService.listsPatient().subscribe(patients => {
      this.patients = patients.sort((a, b) => a.name.localeCompare(b.name));;
      this.filteredPatients = patients.sort((a, b) => a.name.localeCompare(b.name));;
    });
  }

  searchPatients() {
    if (this.searchQuery.trim() !== '') {
      this.filteredPatients = this.patients.filter(patient =>
        patient.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
    else {
      this.getPatientList();
    }
  }

}
