import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  @ViewChild('sidebarContent') sidebarContent!:ElementRef;
  constructor(private _auth :AuthService,
    private notificationService: NotificationsService,
    private route:Router) { }

  ngOnInit(): void {
  }

  openSidebar(e:any){
    this.stopProp(e);
    this.sidebarContent.nativeElement.classList.add('open');
  }
  closeSidebar(e:any){
    this.sidebarContent.nativeElement.classList.remove('open');
  }

  stopProp(event:any){
    event.stopPropagation();
  }

  logout(){
    this._auth.signOut();
    this.notificationService.success('','You have been successfully logged out');
    this.route.navigate(['/auth/sign-in']);
  }

}
