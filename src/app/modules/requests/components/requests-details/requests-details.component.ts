import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { ErrorHandlingService } from 'src/app/core/services/error-handling.service';
import { HttpService } from 'src/app/core/services/http.service';

@Component({
  selector: 'app-requests-details',
  templateUrl: './requests-details.component.html',
  styleUrls: ['./requests-details.component.scss']
})
export class RequestsDetailsComponent {
  @Input() details: any = {}
  @Output() accept = new EventEmitter<any>();
  constructor(
    private api:HttpService,
    private errHandle: ErrorHandlingService,
    private notificationService: NotificationsService
    ){
      
    }
  isLoadingRemove: boolean = false
  isLoadingConfirm: boolean = false
  err: boolean = false
  confirmRequest(){
    if(this.drivers.length==0){
      this.err = true
      return;
    }
    this.isLoadingConfirm = true
    let carsIds : any[] = []
     this.drivers.forEach(e=>{
      carsIds.push(e._id)
    })
    let payload = {
      "requestId":this.details._id,
      "carIds":carsIds
    } 
    this.api.patchReq('/api/ambulance/requestscar/',payload).subscribe(
      (res)=>{
        this.isLoadingConfirm = false
        this.notificationService.success('',res?.message);
        this.accept.emit(2)
      },
      (err)=>{
        this.errHandle.errorHandling(err);
        this.notificationService.error('',err?.error.message);
        this.isLoadingConfirm = false
      }
    )
  }
  removeRequest(){
    this.isLoadingRemove = true
    this.api.putReq('/api/cancel-request/'+this.details._id).subscribe(
      (res)=>{
        this.isLoadingRemove = false
        this.notificationService.success('',res?.message);
        this.accept.emit(4)
      },
      (err)=>{
        this.errHandle.errorHandling(err);
        this.notificationService.error('',err?.error.message);
        this.isLoadingRemove = false
      }
    )
  }

  isLoadingDrivers: boolean = false
  errLoadingDrivers: boolean = false
  drivers: any[] = []
  // driver: any = null
  getDrivers(){
    this.err = false
    this.isLoadingDrivers = true
    this.api.getReq('/api/ambulance/available?requestId='+this.details._id,{}).subscribe(
      (res)=>{
        this.isLoadingDrivers = false
        this.drivers = res.slice(0,this.details.Numberofpatients);
      },
      (err)=>{
        this.notificationService.error('',err.error.message||'SomeThing went wrong')
        this.isLoadingDrivers = false
        this.errLoadingDrivers = true
      }
    )
  }
}
