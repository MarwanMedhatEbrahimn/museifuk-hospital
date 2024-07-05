import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {
  constructor(private notify: NotificationsService,
    private route:Router,
    private _auth :AuthService) { }

  errorHandling(err: any) {

    if (err?.error?.Code == 422) {
      // let errorKeys = Object.keys(err?.error.validator)
      this.notify.error("", err?.error?.Errors[0]?.errorMsg);
    }else if (err?.error?.Status == 422) {
      if(err?.error?.Errors?.length > 0){
        // let errorKeys = Object.keys(err?.error.validator)
        this.notify.error("", err?.error?.Errors[0]?.errorMsg);
      }else{
        this.notify.error("", err?.error?.message);
      }
      
    }else if (err?.error?.Code == 420){
      this._auth.setUserObj(err?.error?.Data);
      this.notify.warn("", err?.error?.message);
        this.route.navigate(['/login']);
    } else if (err?.error?.Code == 421){
      this._auth.setUserObj(err?.error?.Data?.user);
      this.notify.warn("", err?.error?.message);
        this.route.navigate(['/login']);
    }else if(err?.error?.Code == 423){
      this.notify.error("", err?.error?.message);
      this.route.navigate(['/login']);
    } else if (err?.error?.message) {
      this.notify.error('', err?.error?.message);
    } else if (err?.error?.Code == 500 || err?.error?.Code == 404) {
      this.notify.error('', 'Something wrong happened, please try again later');
    }else if (err?.status == 500 || err?.status == 404) {
      this.notify.error('',err?.error?.message);
      if(err?.error?.Errors?.length > 0){
        this.notify.error("", err?.error?.Errors[0]?.errorMsg);
      }else{
        this.notify.error("", err?.error?.message);
      }
    } else {
      this.notify.error('', 'Something wrong happened, please try again later');
    }

  }
  
}
