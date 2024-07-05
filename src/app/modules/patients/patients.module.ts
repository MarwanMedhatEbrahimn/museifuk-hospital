import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientsRoutingModule } from './patients-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { PatientsComponent } from './patients.component';
import { AssignComponent } from './components/assign/assign.component';
import { ListComponent } from './components/list/list.component';
import { PatientDetailsComponent } from './components/patient-details/patient-details.component';
import { MultiSelectModule } from 'primeng/multiselect';

@NgModule({
  declarations: [
    PatientsComponent,
    AssignComponent,
    ListComponent,
    PatientDetailsComponent,
  ],
  imports: [
    CommonModule,
    PatientsRoutingModule,
    NgbPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    NgxSkeletonLoaderModule,
    SharedModule,
    MultiSelectModule
  ]
})
export class PatientsModule { }
