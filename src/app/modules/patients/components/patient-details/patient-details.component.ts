import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { ErrorHandlingService } from 'src/app/core/services/error-handling.service';
import { HttpService } from 'src/app/core/services/http.service';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.scss']
})
export class PatientDetailsComponent {
  @Input() details: any = {}
  @Output() Remove = new EventEmitter<any>();
  constructor(
    private api:HttpService,
    private errHandle: ErrorHandlingService,
    private notificationService: NotificationsService
    ){}
  isLoading: boolean = false
  removePatient(id:any){
    this.isLoading = true
    this.api.deleteReq('',{"id":id}).subscribe(
      (res)=>{
        this.isLoading = false
        this.notificationService.success('',res?.Message);
        this.Remove.emit('')
      },
      (err)=>{
        this.errHandle.errorHandling(err);
        console.log(err)
        if(err?.Message){
          if(err?.Errors){
            this.notificationService.error('',err?.Errors[0].errorMsg);
          }
          else{
            this.notificationService.error('',err?.Message);
          }
        }
        else{
          if(err?.error?.Errors){
            this.notificationService.error('',err?.error.Errors[0].errorMsg);
          }
          else{
            this.notificationService.error('',err?.error.Message);
          }
        }
        this.isLoading = false
      }
    )
  }
}
