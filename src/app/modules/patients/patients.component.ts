import { Component } from '@angular/core';
import { HttpService } from './../../core/services/http.service';
import { Observable, switchMap, tap } from 'rxjs';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit{
  current_Router: any = '1'
  isLoading: boolean = false 

  serverErrorFetch: string|null = null
  isLoadingSubmit:boolean = false
  isAdd:boolean = true
  
  dataTable: any[] = [{name:"asd"}]
  allPatients:any[] = [{name:"asd"}]

  department: any[] = []
  equipment: any[] = []
  serum: any[] = []

  isDetails: boolean = false

  ngOnInit(): void {
    this.getAllPatients();
    this.getHospitalData()
  }
  constructor(
    private _api:HttpService,
    private activatedRoute:ActivatedRoute,
    ) {}
  changeRouter(Router:String){
    this.current_Router = Router;
    this.isDetails = false
  }
  searchKeyword: string = ''
  row: any = {}
  search() {
    this.current_Router = 1;
    this.serverErrorFetch = null;
    if(this.searchKeyword.length > 2){
      this.isLoading = true
      this.dataTable = this.dataTable.filter(e=>{
        return e.name.includes(this.searchKeyword);
      })
      this.isLoading = false
    }
    else{
      this.dataTable = this.allPatients
    }
  }
  getPatients():Observable<any>{
    return this._api.getReq('/api/hospital/getPatient',{params:{}})
  }
  getAllPatients(){
    this.activatedRoute.queryParams.pipe(
      tap((params)=>{
        this.isLoading = true
      }),switchMap((params)=>{
        return this.getPatients()
      })
    ).subscribe(
      (res)=>{
        this.successCallBack(res)
      },
      (err)=>{
        this.errorCallBack(err)
      }
      )
  }
  successCallBack(res: any){
    this.allPatients = res ? res : []
    this.dataTable = this.allPatients
    this.isLoading = false;
    this.serverErrorFetch = null;
  }
  errorCallBack(err: any){
//  use error handling service
    if(err?.error?.Errors){
      this.serverErrorFetch = err?.error?.message||'Something wrong happened, please try again later';
    }else{
      this.serverErrorFetch = 'Something wrong happened, please try again later'
    }
    this.isLoading = false;
  }
  onSubmitSuccess($event: any) {
    this.current_Router = 1;
    this.isDetails = false
    this.getAllPatients();
  }
  onOpenDetails($event: any) {
    this.isDetails = true;
    console.log($event)
    this.row = $event
  }
  isLoadingDropDown: boolean = false
  errorDropDown: boolean = false
  getHospitalData(){
    this.isLoadingDropDown = true
    this._api.getReq('/api/hospital/gethospital',{}).subscribe(
      (res)=>{
        this.department = res.departments ? res.departments : []
        this.equipment = res.medicalEquipment ? res.medicalEquipment : []
        this.serum = res.serumsAndVaccines ? res.serumsAndVaccines : []
        this.isLoadingDropDown = false
      },
      (err)=>{
        this.isLoadingDropDown = false
        this.errorDropDown = false
      }
    )
  }

}
