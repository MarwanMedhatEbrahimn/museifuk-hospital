import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlasmaRoutingModule } from './plasma-routing.module';
import { PlasmaComponent } from './plasma.component';
import { DialogModule } from 'primeng/dialog';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SharedModule } from 'src/app/shared/shared.module';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [
    PlasmaComponent
  ],
  imports: [
    CommonModule,
    PlasmaRoutingModule,
    DialogModule,
    NgbPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    NgxSkeletonLoaderModule,
    SharedModule,
    CalendarModule
  ]
})
export class PlasmaModule { }
