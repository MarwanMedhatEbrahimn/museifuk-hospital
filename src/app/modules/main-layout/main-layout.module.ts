import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainLayoutRoutingModule } from './main-layout-routing.module';
import { MainLayoutComponent } from './main-layout.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    MainLayoutComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    MainLayoutRoutingModule,
    SharedModule,
  ]
})
export class MainLayoutModule { }
