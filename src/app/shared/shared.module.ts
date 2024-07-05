import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormErrorsComponent } from './components/form-errors/form-errors.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { DialogModule } from 'primeng/dialog';
import { RouterModule } from '@angular/router';
import { DateFormatPipe } from '../date-format.pipe';



@NgModule({
  declarations: [
    FormErrorsComponent,
    NavBarComponent,
    DateFormatPipe
  ],
  imports: [
    CommonModule,
    DialogModule,
    RouterModule
  ],
  exports:[
    FormErrorsComponent,
    NavBarComponent,
    DateFormatPipe
  ]
})
export class SharedModule { }
