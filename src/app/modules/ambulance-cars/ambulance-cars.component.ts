import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';

import Pusher from 'pusher-js/types/src/core/pusher';

import { Observable, switchMap, tap } from 'rxjs';
import { ErrorHandlingService } from 'src/app/core/services/error-handling.service';
import { HttpService } from 'src/app/core/services/http.service';
import { ValidationService } from 'src/app/core/services/validation.service';

@Component({
  selector: 'app-ambulance-cars',
  templateUrl: './ambulance-cars.component.html',
  styleUrls: ['./ambulance-cars.component.scss']
})
export class AmbulanceCarsComponent implements OnInit{
  isMobile: boolean = window.innerWidth < 768 ? true : false;
  addAmbulance: boolean = false
  showMap: boolean = false
  isLoading: boolean = false 
  searchKeyword: string = ''

  loadingSchema: any = ['','','','','','','','','']
  serverErrorFetch: string|null = null
  addEditAmbulance!: FormGroup
  isLoadingSubmit:boolean = false
  isAdd:boolean = true
  
  dataTable: any[] = [ 
    {name:"marwan",carNumber:213}
  ]
  carDetails: any = {}
  allAmbulance:any[] = []
  constructor(
    private router:Router, 
    private _api:HttpService,
    private activatedRoute:ActivatedRoute,
    private errHandle: ErrorHandlingService,
    private notificationService: NotificationsService,
    private validation:ValidationService,
    ) {}
  ngOnInit(): void {
    this.addEditAmbulance = new FormGroup({
      carNumber: new FormControl('',[Validators.required,Validators.minLength(6)]),
      location: new FormControl('',[Validators.required,Validators.minLength(3)]),
      driver: new FormControl('',[]),
    })
    this.getAllAmbulance() 
  }
  getAllAmbulance(){
    this.isLoading = true
    this._api.getReq('/api/ambulance/car',{params:{}}).subscribe(
      (res)=>{
        this.successCallBackForGetTeams(res)
      },
      (err)=>{
        this.errorCallBackForGetTeams(err)
      }
      )
  }
  successCallBackForGetTeams(res: any){
    this.allAmbulance = res ? res : []
    this.dataTable = this.allAmbulance
    this.isLoading = false;
    this.serverErrorFetch = null;
    this.getAllDrivers()
  }
  errorCallBackForGetTeams(err: any){
//  use error handling service
    if(err?.error?.Errors){
      this.serverErrorFetch = err?.error?.Errors[0]?.errorMsg||'Something wrong happened, please try again later';
    }else{
      this.serverErrorFetch = 'Something wrong happened, please try again later'
    }
    this.isLoading = false;
  }
  search() {
    this.serverErrorFetch = null;
    if(this.searchKeyword.length > 2){
      this.isLoading = true
      this.dataTable = this.dataTable.filter(e=>{
        return e.name.includes(this.searchKeyword);
      })
      this.isLoading = false
    }
    else{
      this.dataTable = this.allAmbulance
    }
  }
  AmbulanceId:any
  openAddEditAmbulancePage(isAdd:boolean , row:any){
    this.isAdd = isAdd
    this.addAmbulance = true
    this.onHide()
    if(!isAdd){
      this.drive = row?.assignedDriver
      if(this.drive?._id)
        this.drivers.push(this.drive)
      this.AmbulanceId = row._id 
      this.addEditAmbulance.patchValue({
        carNumber:row.carNumber,
        location:row.location,
        driver:row?.assignedDriver,
      })
    }
  }
  closeAddEditAmbulancePage(){
    this.addAmbulance = false
  }

  onSubmit(){
    if(this.addEditAmbulance.invalid || !this.addEditAmbulance.dirty){
      this.addEditAmbulance.markAllAsTouched();
      return;
    }
    this.isLoadingSubmit = true
    let row = this.addEditAmbulance?.value
    let payload: any = {
      carNumber:row.carNumber,
      location:row.location,
      assignedDriver:row.driver._id,
      lastLocation:{
        coordinates:{
          type:'Point',
          coordinates:[30.547746, 31.037486]
        }
      }
    }
    if(this.isAdd){
      this._api.postReq('/api/ambulance/car',payload).subscribe(
        (res)=>{
          this.notificationService.success('',res?.Message);
          this.getAllAmbulance();
          this.onHide();
          this.isLoadingSubmit = false
          this.addAmbulance = false
        },
        (err)=>{
          this.errHandle.errorHandling(err);
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
          this.isLoadingSubmit = false
        }
      )
    }
    else{
      this._api.patchReq('/api/ambulance/car/'+this.AmbulanceId,payload).subscribe(
        (res)=>{
          this.notificationService.success('',res?.message||"Car edit Successfully");
          this.getAllAmbulance();
          this.onHide();
          this.isLoadingSubmit = false
          this.addAmbulance = false
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
          this.isLoadingSubmit = false
        }
      )
    }
  }
  onHide(){
    this.addEditAmbulance.reset();
    this.addEditAmbulance.markAsUntouched();
    if(this.drive?._id)
      this.drivers = this.drivers.filter(e=>{return this.drive._id!=e._id})
    this.drive = null
  }
  openMap(row: any){
    this.carDetails = row;
    console.log(this.carDetails);
    this.showMap = true;
  }
  drive:any = null
  drivers: any[] = []
  isLoadingDriver: boolean = false
  errLoadingDriver: boolean = false
  getAllDrivers(){
    this.isLoadingDriver = true
    this._api.getReq('/api/ambulance/driver',{}).subscribe(
      (res)=>{
        this.drivers = res ? res : []
        this.isLoadingDriver = false
        this.drivers = this.drivers.filter(ele=>{
          let flag = true
          this.allAmbulance.forEach(e=>{
            if(ele._id==e?.assignedDriver?._id){
              flag = false
            }
          })
          return flag
        })
      },
      (err)=>{
        this.notificationService.error('','Error in Loading Drivers')
        this.isLoadingDriver = false
        this.errLoadingDriver = true
      }
    )
  }
}

