import { Component } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { ErrorHandlingService } from './../../core/services/error-handling.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from './../../core/services/http.service';
import { Observable, switchMap, tap } from 'rxjs';
import { OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ValidationService } from 'src/app/core/services/validation.service';

@Component({
  selector: 'app-machines',
  templateUrl: './machines.component.html',
  styleUrls: ['./machines.component.scss']
})
export class MachinesComponent implements OnInit{
  isMobile: boolean = window.innerWidth < 768 ? true : false;
  addMachine: boolean = false
  isLoading: boolean = false 
  searchKeyword: string = ''

  loadingSchema: any = ['','','','','','','','','']
  serverErrorFetch: string|null = null
  addEditMachine!: FormGroup
  isLoadingSubmit:boolean = false
  isAdd:boolean = true
  
  dataTable: any[] = []
  allMachine:any[] = []

  constructor(
    private router:Router, 
    private _api:HttpService,
    private activatedRoute:ActivatedRoute,
    private errHandle: ErrorHandlingService,
    private notificationService: NotificationsService,
    private validation:ValidationService
    ) {}
  ngOnInit(): void {
    this.addEditMachine = new FormGroup({
      name: new FormControl('',[Validators.required,Validators.minLength(3)]),
      quantity: new FormControl('',[Validators.required,Validators.pattern(this.validation.numerical)]),
      // create_at: new FormControl('',[Validators.required]),
  })
    this.getAllMachine()
  }
  getMachine():Observable<any>{
    return this._api.getReq('/api/hospital/gethospital',{params:{}})
  }
  getAllMachine(){
    this.activatedRoute.queryParams.pipe(
      tap((params)=>{
        this.isLoading = true
      }),switchMap((params)=>{
        return this.getMachine()
      })
    ).subscribe(
      (res)=>{
        this.successCallBackForGetTeams(res)
      },
      (err)=>{
        this.errorCallBackForGetTeams(err)
      }
      )
  }
  successCallBackForGetTeams(res: any){
    this.allMachine = res?.medicalEquipment ? res?.medicalEquipment : []
    this.dataTable = this.allMachine
    this.isLoading = false;
    this.serverErrorFetch = null;
  }
  errorCallBackForGetTeams(err: any){
//  use error handling service
    if(err?.error?.Errors){
      this.serverErrorFetch = err?.error?.message ||'Something wrong happened, please try again later';
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
      this.dataTable = this.allMachine
    }
  }
  MachineId:any
  openAddEditMachinePage(isAdd:boolean , row:any){
    this.isAdd = isAdd
    this.addMachine = true
    this.onHide()
    if(!isAdd){
      this.MachineId = row.id 
      this.addEditMachine.patchValue({
        name:row.name,
        quantity:row.quantity
      })
    }
    console.log(this.isAdd)
  }
  closeAddEditMachinePage(){
    this.addMachine = false
  }

  onSubmit(){
    console.log(this.isAdd)
    if(this.addEditMachine.invalid || !this.addEditMachine.dirty){
      console.log(this.addEditMachine.dirty)
      this.addEditMachine.markAllAsTouched();
      return;
    }
    this.isLoadingSubmit = true
    let payload: any = {
      name:this.addEditMachine?.value?.name,
      quantity:this.addEditMachine?.value?.quantity
    }
    if(this.isAdd){
      this._api.postReq('/api/update-medical-equipment',payload).subscribe(
        (res)=>{
          this.notificationService.success('',res?.message);
          this.getAllMachine();
          this.onHide();
          this.isLoadingSubmit = false
          this.addMachine = false
        },
        (err)=>{
          this.notificationService.error('',err?.error.message);
          this.isLoadingSubmit = false
        }
      )
    }
    else{
      this._api.postReq('/api/update-medical-equipment',payload).subscribe(
        (res)=>{
          this.notificationService.success('',res?.message);
          this.getAllMachine();
          this.onHide();
          this.isLoadingSubmit = false
          this.addMachine = false
        },
        (err)=>{
          this.notificationService.error('',err?.error.message);
          this.isLoadingSubmit = false
        }
      )
    }
  }
  onHide(){
    this.addEditMachine.reset();
    this.addEditMachine.markAsUntouched();
  }
}



