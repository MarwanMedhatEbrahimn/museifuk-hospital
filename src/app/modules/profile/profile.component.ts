import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  hospitalData: any = {}
  constructor(private auth: AuthService){
    this.hospitalData = auth.getHospitalDetails()
    this.hospitalData['phone'] = '01122673849'
    this.hospitalData['beds'] = 0
    this.hospitalData['imageUrl'] = "./assets/images/image.png"
    this.hospitalData.departments.forEach((element:any) => {
      this.hospitalData['beds'] += element.numberOfBeds
    });
  }
}
