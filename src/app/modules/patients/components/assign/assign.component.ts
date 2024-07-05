import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { ErrorHandlingService } from './../../../../core/services/error-handling.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from './../../../../core/services/http.service';
import { OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ValidationService } from 'src/app/core/services/validation.service';
import { AuthService } from 'src/app/core/services/auth.service';
@Component({
  selector: 'app-assign',
  templateUrl: './assign.component.html',
  styleUrls: ['./assign.component.scss']
})
export class AssignComponent implements OnInit{
  addEditDepartment!:FormGroup
  isLoadingSubmit: boolean = false
  genderOptions: any = ["Male","Female"]
  @Input() department: any = []
  @Input() equipment: any = []
  @Input() serum: any = []
  @Input() isLoading: boolean = false
  @Input() errorInLoading: boolean = false
  @Output() submitSuccess = new EventEmitter<any>();
  
  constructor(
    private router:Router, 
    private _api:HttpService,
    private auth:AuthService,
    private errHandle: ErrorHandlingService,
    private notificationService: NotificationsService,
    private validation:ValidationService
    ) {
      this.id = this.auth.getUserObj().hospitalId
      console.log(this.auth.getUserObj())
    }
  id: any = ''
  ngOnInit(): void {
    this.addEditDepartment = new FormGroup({
      name: new FormControl('',[Validators.required,Validators.minLength(3)]),
      age: new FormControl('',[Validators.required,Validators.min(0),Validators.max(140),Validators.pattern(this.validation.numerical)]),
      gender: new FormControl('',[Validators.required]),
      condition: new FormControl('',[Validators.required, Validators.minLength(4)]),
      department: new FormControl('',[Validators.required]),
      equipmentNeeded: new FormControl('',[]),
      serumsNeeded: new FormControl('',[]),
    })
  }

  onSubmit(){
    if(this.addEditDepartment.invalid || !this.addEditDepartment.dirty){
      this.addEditDepartment.markAllAsTouched();
      return;
    }
    this.isLoadingSubmit = true
    const date = new Date();
    let equipmentNeeded: any[] = []
    let serumsNeeded: any[] = []
    this.addEditDepartment?.value?.equipmentNeeded.forEach((element:any) => {
      equipmentNeeded.push(element.name)
    });
    this.addEditDepartment?.value?.serumsNeeded.forEach((element:any) => {
      serumsNeeded.push(element.name)
    });
    let payload: any = {
      name:this.addEditDepartment?.value?.name,
      age:this.addEditDepartment?.value?.age,
      gender:this.addEditDepartment?.value?.gender,
      condition:this.addEditDepartment?.value?.condition,
      hospitalId:this.id,
      department: this.addEditDepartment?.value?.department.name,
      equipmentNeeded:equipmentNeeded,
      serumsNeeded:serumsNeeded,
      assignedAt:date,
    }
    this._api.postReq('/api/hospitals/addpatient',payload).subscribe(
      (res:any)=>{
        this.notificationService.success('','Patient Adding Success');
        this.submitSuccess.emit('')
        this.onHide();
        this.isLoadingSubmit = false
      },
      (err:any)=>{
        this.notificationService.success('',err.error.message||"something went wrong");
        this.isLoadingSubmit = false
      }
    )
  }
  onHide(){
    this.addEditDepartment.reset();
    this.addEditDepartment.markAsUntouched();
  }
}
