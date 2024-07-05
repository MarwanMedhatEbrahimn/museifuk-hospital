import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  isMainDomain:boolean=false;
  isActiveClientsTab:boolean = false;

  @Output('closeSidebar') closeSideBar = new EventEmitter<boolean>();
  constructor(private auth:AuthService) { }
  role: string = 'Owner'
  ngOnInit(): void {
    this.role = this.auth.getRole()
  }

  closeSidebar(){
    this.closeSideBar.emit(true);
  }
}
