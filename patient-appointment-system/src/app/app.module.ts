import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PatientCreateComponent } from './patient-create/patient-create.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { AppointmentCreateComponent } from './appointment-create/appointment-create.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PatientDetailComponent } from './patient-detail/patient-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    PatientCreateComponent,
    PatientListComponent,
    AppointmentListComponent,
    AppointmentCreateComponent,
    DashboardComponent,
    PatientDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
