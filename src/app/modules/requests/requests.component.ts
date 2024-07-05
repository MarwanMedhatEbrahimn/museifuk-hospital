import { Component } from '@angular/core';
import { HttpService } from './../../core/services/http.service';
import { Observable, switchMap, tap } from 'rxjs';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PusherService } from 'src/app/core/services/pusher.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit{
  current_Router: any = '1'

  isLoadingSubmit:boolean = false
  isEdit:boolean = false

  isLoading: boolean = false 
  serverErrorFetch: string|null = null
  dataTable: any[] = []
  allRequests:any[] = []

  dataTable2: any[] = []
  allRequests2:any[] = []

  dataTable3: any[] = []
  allRequests3:any[] = []

  dataTable4: any[] = []
  allRequests4:any[] = []
  
  filter: any  = 'label created'
  ngOnInit(): void {
    this.getAllRequests();
    this.pusherService.channelName= 'newRequestCar-channel'
    this.pusherService.bind('newRequestCar', (data: any) => {
        console.log('newRequestCar:', data);
        this.dataTable.push(data)
        this.allRequests.push(data)
    });
    this.pusherService.bind('pusher:subscription_succeeded', () => {
        console.log('Subscribed to channel');
    });
  }
  constructor(
    private _api:HttpService,
    private pusherService: PusherService
    ) {}
  changeRouter(Router:String){
    this.isEdit = false
    this.current_Router=Router;
  }
  searchKeyword: string = ''
  search() {
    this.serverErrorFetch = null;
    if(this.searchKeyword.length > 2){
      this.isLoading = true
      this.dataTable = this.allRequests.filter(e=>{
        return e.patientName.includes(this.searchKeyword);
      })
      this.dataTable2 = this.allRequests2.filter(e=>{
        return e.patientName.includes(this.searchKeyword);
      })
      this.dataTable3 = this.allRequests3.filter(e=>{
        return e.patientName.includes(this.searchKeyword);
      })
      this.dataTable4 = this.allRequests4.filter(e=>{
        return e.patientName.includes(this.searchKeyword);
      })
      this.isLoading = false
    }
    else{
      this.dataTable = this.allRequests
      this.dataTable2 = this.allRequests2
      this.dataTable3 = this.allRequests3
    }
  }

  getAllRequests(){
    this.isLoading = true
    this._api.getReq('/api/ambulance/requestscar').subscribe(
      (res)=>{
        this.allRequests = res ? res : []
        this.allRequests = this.allRequests.filter((ele)=>{
          return ele.state == "label created"
        })
        this.dataTable = this.allRequests

        this.allRequests2 = res ? res : []
        this.allRequests2 = this.allRequests2.filter((ele)=>{
          return ele.state == "in progress"
        })
        this.dataTable2 = this.allRequests2

        this.allRequests3 = res ? res : []
        this.allRequests3 = this.allRequests3.filter((ele)=>{
          return ele.state == "deliverd"
        })
        this.dataTable3 = this.allRequests3

        this.allRequests4 = res ? res : []
        this.allRequests4 = this.allRequests4.filter((ele)=>{
          return ele.state == "cancelled"
        })
        this.dataTable4 = this.allRequests4

        this.isLoading = false;
        this.serverErrorFetch = null;
      },
      (err)=>{
        if(err?.error?.Errors){
          this.serverErrorFetch = err?.error?.Errors[0]?.errorMsg||'Something wrong happened, please try again later';
        }else{
          this.serverErrorFetch = 'Something wrong happened, please try again later'
        }
        this.isLoading = false;
      }
    )
  }
  row: any = {}
  onOpenDetails($event: any) {
    this.isEdit = true;
    this.row = $event
  }

  changeRouterWith(goTo:any){
    this.isEdit = false
    this.current_Router=goTo;
    this.searchKeyword = ''
    this.getAllRequests();
  }

}
