import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AmbulanceCarsComponent } from './ambulance-cars.component';

const routes: Routes = [
  {path:'',component:AmbulanceCarsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AmbulanceCarsRoutingModule { }
