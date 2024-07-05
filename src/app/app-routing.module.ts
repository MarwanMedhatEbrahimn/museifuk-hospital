import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { notAuthGuard } from './core/guards/not-auth.guard';
import { combinedAuthGuard } from './core/guards/combined-auth.guard';

const routes: Routes = [
  {path:'',redirectTo:'dashboard',pathMatch:'full'},
  {
    path:'dashboard',
    loadChildren:() => import('./modules/main-layout/main-layout.module').then(m => m.MainLayoutModule),
    canLoad:[combinedAuthGuard]
  },
  {
    path:'login',
    loadChildren:() => import('./modules/login/login.module').then(m => m.LoginModule),
    canLoad:[notAuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
