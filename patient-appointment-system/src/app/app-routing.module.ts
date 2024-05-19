import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientCreateComponent } from './patient-create/patient-create.component';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { AppointmentCreateComponent } from './appointment-create/appointment-create.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PatientDetailComponent } from './patient-detail/patient-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'patients', component: PatientListComponent },
  { path: 'patients/create', component: PatientCreateComponent },
  { path: 'appointments', component: AppointmentListComponent },
  { path: 'appointments/create', component: AppointmentCreateComponent },
  { path: 'patient/:id', component: PatientDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
