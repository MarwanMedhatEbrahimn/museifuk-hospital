import { Component } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { HttpService } from './core/services/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'museifuk-hospital';
  notifierOptions: any = {
    animate: "fromTop",
    position: ["top", "right"],
    clickToClose: true,
    maxStack:1
  }
  constructor(private auth:AuthService, private api:HttpService){
    if(auth.getUserToken() && auth.getRole() == 'Owner'){
      api.getReq('/api/hospital/gethospital').subscribe(
        (res)=>{
          auth.setHospitalDetails(res);
        }
      )
    }
  }
}
