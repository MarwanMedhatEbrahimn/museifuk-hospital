import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MachinesRoutingModule } from './machines-routing.module';
import { MachinesComponent } from './machines.component';

import { DialogModule } from 'primeng/dialog';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SharedModule } from 'src/app/shared/shared.module';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [
    MachinesComponent,
  ],
  imports: [
    CommonModule,
    MachinesRoutingModule,
    DialogModule,
    NgbPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    NgxSkeletonLoaderModule,
    SharedModule,
    CalendarModule,
  ]
})
export class MachinesModule { }
