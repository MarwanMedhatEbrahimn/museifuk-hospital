import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestsRoutingModule } from './requests-routing.module';
import { RequestsComponent } from './requests.component';
import { NewRequestsComponent } from './components/new-requests/new-requests.component';
import { FinishedRequestsComponent } from './components/finished-requests/finished-requests.component';
import { InProgressRequestsComponent } from './components/in-progress-requests/in-progress-requests.component';
import { RequestsDetailsComponent } from './components/requests-details/requests-details.component';
import { DialogModule } from 'primeng/dialog';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SharedModule } from 'src/app/shared/shared.module';
import { MultiSelectModule } from 'primeng/multiselect';
import { CancelRequestsComponent } from './components/cancel-requests/cancel-requests.component';


@NgModule({
  declarations: [
    RequestsComponent,
    NewRequestsComponent,
    FinishedRequestsComponent,
    InProgressRequestsComponent,
    RequestsDetailsComponent,
    CancelRequestsComponent
  ],
  imports: [
    CommonModule,
    RequestsRoutingModule,
    DialogModule,
    NgbPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    NgxSkeletonLoaderModule,
    SharedModule,
    MultiSelectModule
  ]
})
export class RequestsModule { }
