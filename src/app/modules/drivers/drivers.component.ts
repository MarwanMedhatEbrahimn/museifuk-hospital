import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { Observable, switchMap, tap } from 'rxjs';
import { ErrorHandlingService } from 'src/app/core/services/error-handling.service';
import { HttpService } from 'src/app/core/services/http.service';
import { ValidationService } from 'src/app/core/services/validation.service';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.scss']
})
export class DriversComponent implements OnInit{
  isMobile: boolean = window.innerWidth < 768 ? true : false;
  addDriver: boolean = false
  isLoading: boolean = false 
  searchKeyword: string = ''

  loadingSchema: any = ['','','','','','','','','']
  serverErrorFetch: string|null = null
  addEditDriver!: FormGroup
  isLoadingSubmit:boolean = false
  isAdd:boolean = true
  
  dataTable: any[] = []
  allDriver:any[] = []

  constructor(
    private router:Router, 
    private _api:HttpService,
    private activatedRoute:ActivatedRoute,
    private errHandle: ErrorHandlingService,
    private notificationService: NotificationsService,
    private validation:ValidationService
    ) {}
  ngOnInit(): void {
    this.addEditDriver = new FormGroup({
      name: new FormControl('',[Validators.required,Validators.minLength(3)]),
      licenseNumber: new FormControl('',[Validators.required]),
      contactNumber: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required]),
    })
    this.getAllDriver()
  }
  
  getAllDriver(){
    this._api.getReq('/api/ambulance/driver',{params:{}}).subscribe(
      (res)=>{
        this.successCallBackForGetTeams(res)
      },
      (err)=>{
        this.errorCallBackForGetTeams(err)
      }
      )
  }
  successCallBackForGetTeams(res: any){
    this.allDriver = res ? res : []
    this.dataTable = this.allDriver
    this.isLoading = false;
    this.serverErrorFetch = null;
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
      this.dataTable = this.allDriver
    }
  }
  DriverId:any
  openAddEditDriverPage(isAdd:boolean , row:any){
    this.isAdd = isAdd
    this.addDriver = true
    this.onHide()
    if(!isAdd){
      this.DriverId = row._id 
      this.addEditDriver.patchValue({
        name:row.name,
        email:row.email,
        password:row.password,
        contactNumber:row.contactNumber,
        licenseNumber:row.licenseNumber,
      })
    }
    console.log(this.isAdd)
  }
  closeAddEditDriverPage(){
    this.addDriver = false
  }

  onSubmit(){
    console.log(this.isAdd)
    if(this.addEditDriver.invalid || !this.addEditDriver.dirty){
      console.log(this.addEditDriver.dirty)
      this.addEditDriver.markAllAsTouched();
      return;
    }
    this.isLoadingSubmit = true
    let row = this.addEditDriver?.value
    let payload: any = {
      name:row.name,
      email:row.email,
      password:row.password,
      contactNumber:row.contactNumber,
      licenseNumber:row.licenseNumber,
      role:"Driver"
    }
    if(this.isAdd){
      this._api.postReq('/api/ambulance/driver',payload).subscribe(
        (res)=>{
          this.notificationService.success('',res?.message);
          this.getAllDriver();
          this.onHide();
          this.isLoadingSubmit = false
          this.addDriver = false
        },
        (err)=>{
          this.notificationService.error('',err?.error?.message);
          this.isLoadingSubmit = false
        }
      )
    }
    else{
      this._api.patchReq('/api/ambulance/driver'+this.DriverId,payload).subscribe(
        (res)=>{
          this.notificationService.success('',res?.message || "Driver Edit Successful");
          this.getAllDriver();
          this.onHide();
          this.isLoadingSubmit = false
          this.addDriver = false
        },
        (err)=>{
          this.notificationService.error('',err?.error?.message);
          this.isLoadingSubmit = false
        }
      )
    }
  }
  onHide(){
    this.addEditDriver.reset();
    this.addEditDriver.markAsUntouched();
  }
}

