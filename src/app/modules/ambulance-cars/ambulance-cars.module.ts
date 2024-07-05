import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AmbulanceCarsRoutingModule } from './ambulance-cars-routing.module';

import { CalendarModule } from 'primeng/calendar';
import { SharedModule } from './../../shared/shared.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { AmbulanceCarsComponent } from './ambulance-cars.component';
import { MapComponent } from './map/map.component';

@NgModule({
  declarations: [
    AmbulanceCarsComponent,
    MapComponent
  ],
  imports: [
    CommonModule,
    AmbulanceCarsRoutingModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    NgxSkeletonLoaderModule,
    SharedModule,
    CalendarModule,
  ]
})
export class AmbulanceCarsModule { }
