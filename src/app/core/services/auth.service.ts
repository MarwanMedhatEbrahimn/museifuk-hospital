import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuth: boolean = false;
  role:any = "";
  // isAdmin: any = this.isUserAdmin();
  baseUrl = "";
  isRememberMe: any
  constructor(
    private router: Router) { }
  getUserToken(){
    return localStorage.getItem(`museifukToken`);
  }
  setUserToken(token:string){
    localStorage.setItem('museifukToken',token)
  }
  setUserObj(userObj: any) {
    localStorage.setItem('museifiukObj',JSON.stringify(userObj))
    this.isAuth = true;
    this.checkUserAuth();
  }
  getUserObj() {
    if (localStorage.getItem('museifiukObj')) {
      return JSON.parse(localStorage.getItem('museifiukObj') || '{}') 
    }
    return null;
  }
  getRole(){
    this.role = localStorage.getItem(`museifukRole`);
    return this.role;
  }
  setRole(role:any){
    localStorage.setItem('museifukRole',role)
  }
  
  checkUserAuth() {
    if(this.getUserObj()){
      this.isAuth = true;
      const userObj: any = this.getUserObj();
    }
  }

  signOut() {
    localStorage.removeItem('museifiukObj');
    localStorage.removeItem('museifiukToken');
    localStorage.removeItem('museifiukRole');
    localStorage.removeItem('hospitalDetails');
    this.isAuth = false;
    this.router.navigate(['/login'])
  }


  setHospitalDetails(hospitalDetails: any) {
    localStorage.setItem('hospitalDetails',JSON.stringify(hospitalDetails))
  }
  getHospitalDetails() {
    if (localStorage.getItem('hospitalDetails')) {
      return JSON.parse(localStorage.getItem('hospitalDetails') || '{}') 
    }
    return null;
  }

  isUserAuth() {
    return this.isAuth;
  }
}
