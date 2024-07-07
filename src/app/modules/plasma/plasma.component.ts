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
  selector: 'app-plasma',
  templateUrl: './plasma.component.html',
  styleUrls: ['./plasma.component.scss']
})
export class PlasmaComponent implements OnInit{
  isMobile: boolean = window.innerWidth < 768 ? true : false;
  addPlasma: boolean = false
  isLoading: boolean = false 
  searchKeyword: string = ''

  loadingSchema: any = ['','','','','','','','','']
  serverErrorFetch: string|null = null
  addEditPlasma!: FormGroup
  isLoadingSubmit:boolean = false
  isAdd:boolean = true
  
  dataTable: any[] = []
  allPlasma:any[] = []
  minDate!: Date
  constructor(
    private router:Router, 
    private _api:HttpService,
    private activatedRoute:ActivatedRoute,
    private errHandle: ErrorHandlingService,
    private notificationService: NotificationsService,
    private validation:ValidationService
    ) {}
  ngOnInit(): void {
    this.addEditPlasma = new FormGroup({
      name: new FormControl('',[Validators.required,Validators.minLength(3)]),
      quantity: new FormControl('',[Validators.required,Validators.pattern(this.validation.numerical)]),
      expiry_date: new FormControl('',[])
    })
    this.getAllPlasma()
    this.minDate = new Date()
  }
  getPlasma():Observable<any>{
    return this._api.getReq('/api/hospital/gethospital',{params:{}})
  }
  getAllPlasma(){
    this.activatedRoute.queryParams.pipe(
      tap((params)=>{
        this.isLoading = true
      }),switchMap((params)=>{
        return this.getPlasma()
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
    this.allPlasma = res?.serumsAndVaccines ? res?.serumsAndVaccines : []
    this.dataTable = this.allPlasma
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
      this.dataTable = this.allPlasma
    }
  }
  plasmaId:any
  openAddEditPlasmaPage(isAdd:boolean , row:any){
    this.isAdd = isAdd
    this.addPlasma = true
    this.onHide()
    if(!isAdd){
      this.plasmaId = row.id 
      this.addEditPlasma.patchValue({
        name:row.name,
        quantity:row.quantity,
        expiry_date:row.expiry_date
      })
    }
    console.log(this.isAdd)
  }
  closeAddEditPlasmaPage(){
    this.addPlasma = false
  }

  onSubmit(){
    console.log(this.isAdd)
    if(this.addEditPlasma.invalid || !this.addEditPlasma.dirty){
      console.log(this.addEditPlasma.dirty)
      this.addEditPlasma.markAllAsTouched();
      return;
    }
    this.isLoadingSubmit = true
    let payload: any = {
      name:this.addEditPlasma?.value?.name,
      quantity:this.addEditPlasma?.value?.quantity,
      expiryDate:this.addEditPlasma?.value?.expiry_date
    }
    if(this.isAdd){
      this._api.postReq('/api/update-serums-Vaccines',payload).subscribe(
        (res)=>{
          this.notificationService.success('',res?.message);
          this.getAllPlasma();
          this.onHide();
          this.isLoadingSubmit = false
          this.addPlasma = false
        },
        (err)=>{
          this.errHandle.errorHandling(err);
          console.log(err)
          this.notificationService.error('',err?.error.message);
          this.isLoadingSubmit = false
        }
      )
    }
    else{
      this._api.postReq('/api/update-serums-Vaccines',payload).subscribe(
        (res)=>{
          this.notificationService.success('',res?.message);
          this.getAllPlasma();
          this.onHide();
          this.isLoadingSubmit = false
          this.addPlasma = false
        },
        (err)=>{
          this.notificationService.error('',err?.error.message);
          this.isLoadingSubmit = false
        }
      )
    }
  }
  onHide(){
    this.addEditPlasma.reset();
    this.addEditPlasma.markAsUntouched();
  }
}

