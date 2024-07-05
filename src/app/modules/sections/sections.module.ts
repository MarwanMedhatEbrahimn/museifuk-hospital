import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SectionsRoutingModule } from './sections-routing.module';
import { SectionsComponent } from './sections.component';

import { DialogModule } from 'primeng/dialog';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SharedModule } from 'src/app/shared/shared.module';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [
    SectionsComponent,
  ],
  imports: [
    CommonModule,
    SectionsRoutingModule,
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
export class SectionsModule { }
