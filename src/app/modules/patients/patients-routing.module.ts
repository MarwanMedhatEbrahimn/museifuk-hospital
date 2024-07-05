import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientsComponent } from './patients.component';
import { ListComponent } from './components/list/list.component';
import { AssignComponent } from './components/assign/assign.component';

const routes: Routes = [
  {path:'',component:PatientsComponent,
    children:[
      {path:'',component:ListComponent},
      {path:'',component:AssignComponent}
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientsRoutingModule { }
