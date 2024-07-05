import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { AuthService } from 'src/app/core/services/auth.service';
import { ErrorHandlingService } from 'src/app/core/services/error-handling.service';
import { HttpService } from 'src/app/core/services/http.service';
// import { environment } from 'src/environments/environment';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  isMainDomain: boolean = false;
  @Input('header') header!: string | null;
  @Input('leftArrowRoute') leftArrowRoute!: string | null;
  // @Input('titleStyle') titleStyle: any;
  @Input('isCircle') isCircle: boolean = false;
  // @Input('searchbar') searchbar: any;
  categories: any;
  selectCategory: any;
  showConfirmMessage: boolean = false;
  loading: boolean = false;
  loadingSubmit:boolean=false
  prefixEndpoint:any;

  constructor(
    private _api: HttpService,
    private _auth: AuthService,
    private errHandle: ErrorHandlingService,
    private router: Router,
    private notificationService: NotificationsService,
  ) {}

  ngOnInit(): void {
  }

  backRoute() {
    this.router.navigate([this.leftArrowRoute]);
  }
  showProfileMenu() {
    document
      .querySelector('.account-info .account-info-tab')
      ?.classList.add('show');
    document.querySelector('.overlay-navbar')?.classList.add('show');
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';
  }

  closeProfileMenu() {
    document
      .querySelector('.account-info .account-info-tab')
      ?.classList.remove('show');
    document.querySelector('.overlay-navbar')?.classList.remove('show');
    document.body.style.overflow = 'auto';
  }

  rejected() {
    this.showConfirmMessage = false;
    this.closeProfileMenu()
  }

  logout(){
    this._auth.signOut();
    this.closeProfileMenu();
    this.notificationService.success('','You have been successfully logged out');
    this.router.navigate(['/login']);
  }

}
