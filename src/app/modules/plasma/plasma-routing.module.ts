import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlasmaComponent } from './plasma.component';

const routes: Routes = [
  {path:'',component:PlasmaComponent,pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlasmaRoutingModule { }
