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
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.scss']
})
export class SectionsComponent implements OnInit{
  isMobile: boolean = window.innerWidth < 768 ? true : false;
  addDepartment: boolean = false
  isLoading: boolean = false 
  searchKeyword: string = ''

  loadingSchema: any = ['','','','','','','','','']
  serverErrorFetch: string|null = null
  addEditDepartment!: FormGroup
  isLoadingSubmit:boolean = false
  isAdd:boolean = true
  
  dataTable: any[] = []
  allDepartment:any[] = []

  constructor(
    private router:Router, 
    private _api:HttpService,
    private activatedRoute:ActivatedRoute,
    private errHandle: ErrorHandlingService,
    private notificationService: NotificationsService,
    private validation:ValidationService
    ) {}
  ngOnInit(): void {
    this.addEditDepartment = new FormGroup({
      name: new FormControl('',[Validators.required,Validators.minLength(3)]),
      bed_number: new FormControl('',[Validators.required,Validators.pattern(this.validation.numerical)]),
  })
    this.getAllDepartment()
  }
  getDepartment():Observable<any>{
    return this._api.getReq('/api/hospital/gethospital',{params:{}})
  }
  getAllDepartment(){
    this.activatedRoute.queryParams.pipe(
      tap(()=>{
        this.isLoading = true
      }),switchMap(()=>{
        return this.getDepartment()
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
    this.allDepartment = res?.departments ? res?.departments : []
    this.dataTable = this.allDepartment
    this.isLoading = false;
    this.serverErrorFetch = null;
  }
  errorCallBackForGetTeams(err: any){
//  use error handling service
    if(err?.error?.Errors){
      this.serverErrorFetch = err?.error?.message||'Something wrong happened, please try again later';
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
      this.dataTable = this.allDepartment
    }
  }
  DepartmentId:any
  openAddEditDepartmentPage(isAdd:boolean , row:any){
    this.isAdd = isAdd
    this.addDepartment = true
    this.onHide()
    if(!isAdd){
      this.DepartmentId = row.id 
      this.addEditDepartment.patchValue({
        name:row.name,
        bed_number:row.numberOfBeds,
        create_at:row.createdAt
      })
    }
    console.log(this.isAdd)
  }
  closeAddEditDepartmentPage(){
    this.addDepartment = false
  }

  onSubmit(){
    console.log(this.isAdd)
    if(this.addEditDepartment.invalid || !this.addEditDepartment.dirty){
      console.log(this.addEditDepartment.dirty)
      this.addEditDepartment.markAllAsTouched();
      return;
    }
    this.isLoadingSubmit = true
    let payload: any = {
      name:this.addEditDepartment?.value?.name,
      numberOfBeds:this.addEditDepartment?.value?.bed_number,
    }
    if(this.isAdd){
      this._api.postReq('/api/update-department',payload).subscribe(
        (res)=>{
          this.notificationService.success('',res?.message);
          this.getAllDepartment();
          this.onHide();
          this.isLoadingSubmit = false
          this.addDepartment = false
        },
        (err)=>{
          this.notificationService.error('',err?.message);
          this.isLoadingSubmit = false
        }
      )
    }
    else{
      this._api.postReq('/api/update-department',payload).subscribe(
        (res)=>{
          this.notificationService.success('',res?.message);
          this.getAllDepartment();
          this.onHide();
          this.isLoadingSubmit = false
          this.addDepartment = false
        },
        (err)=>{
          this.notificationService.error('',err?.message);
          this.isLoadingSubmit = false
        }
      )
    }
  }
  onHide(){
    this.addEditDepartment.reset();
    this.addEditDepartment.markAsUntouched();
  }
}


