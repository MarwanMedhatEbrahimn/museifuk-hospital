import { DriversModule } from './../drivers/drivers.module';
import { AmbulanceCarsModule } from './../ambulance-cars/ambulance-cars.module';
import { RequestsModule } from './../requests/requests.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout.component';
import { authHospitalGuard } from 'src/app/core/guards/auth-hospital.guard';
import { authEmergencyGuard } from 'src/app/core/guards/auth-emergency.guard';
import { AuthService } from 'src/app/core/services/auth.service';

const routes: Routes = [
  {path: '', component: MainLayoutComponent,
    children:[
      {path:'patients',
        loadChildren: ()=> import('../patients/patients.module').then((m)=> m.PatientsModule),
        canLoad:[authHospitalGuard]
      },
      {path:'serums',
        loadChildren: ()=> import('../plasma/plasma.module').then((m)=> m.PlasmaModule),
        canLoad:[authHospitalGuard]
      },
      {path:'department',
        loadChildren: ()=> import('../sections/sections.module').then((m)=> m.SectionsModule),
        canLoad:[authHospitalGuard]
      },
      {path:'medical_equipment',
        loadChildren: ()=> import('../machines/machines.module').then((m)=> m.MachinesModule),
        canLoad:[authHospitalGuard]
      },
      {path:'profile',
        loadChildren: ()=> import('../profile/profile.module').then((m)=> m.ProfileModule),
        canLoad:[authHospitalGuard]
      },
      {path:'requests',
        loadChildren: ()=> import('../requests/requests.module').then((m)=> m.RequestsModule),
        canLoad:[authEmergencyGuard]
      },
      {path:'drivers',
        loadChildren: ()=> import('../drivers/drivers.module').then((m)=> m.DriversModule),
        canLoad:[authEmergencyGuard]
      },
      {path:'ambulance',
        loadChildren: ()=> import('../ambulance-cars/ambulance-cars.module').then((m)=> m.AmbulanceCarsModule),
        canLoad:[authEmergencyGuard]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainLayoutRoutingModule { 
  role: any = 'Owner'
  constructor(private auth: AuthService){
    this.role = auth.getRole();
    if(this.role == 'Owner'){
      routes[0].children?.push({
          path:'' ,redirectTo:'patients' ,pathMatch:'full',
          canLoad:[authHospitalGuard]
        }
      )
    }
    else{
      routes[0].children?.push({
          path:'' ,redirectTo:'requests' ,pathMatch:'full',
          canLoad:[authEmergencyGuard]
        }
      )
    }
  }
}
