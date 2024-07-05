import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { AuthService } from 'src/app/core/services/auth.service';
import { ErrorHandlingService } from 'src/app/core/services/error-handling.service';
import { HttpService } from 'src/app/core/services/http.service';
import { ValidationService } from 'src/app/core/services/validation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isLoadingSubmit: boolean = false;
  loginForm!: FormGroup
  constructor(private api:HttpService, private router:Router,private auth: AuthService,
    private validationService: ValidationService,
    private notificationService: NotificationsService,
    private errHandle: ErrorHandlingService){
    this.loginForm = new FormGroup({
      email: new FormControl('',[
        Validators.email,
        Validators.required,
        Validators.pattern(this.validationService?.emailPattern),
      ]),
      password: new FormControl('',Validators.compose([
        Validators.required,
        Validators.minLength(8),
        // accept two arguments pattern style and error message
        // this.validationService.patternValidator(
        //   this.validationService.passwordCapitalLetterPatter,
        //   { notHasCapitalCase: true }
        // ),
        // this.validationService.patternValidator(
        //   this.validationService.passwordSmallLetterPatter,
        //   { notHasSmallCase: true }
        // ),
        this.validationService.patternValidator(
          this.validationService.passwordNumbersPattern,
          { notHasNumber: true }
        ),
        // this.validationService.patternValidator(
        //   this.validationService.passwordSpecialCharPattern,
        //   { notHasSpecialCharacters: true }
        // ),
      ])),
      role: new FormControl('Owner',[Validators.required])
    })
  }
  login(){
    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched()
      return;
    }

    this.isLoadingSubmit = true;
    this.api.postReq('/api/login',this.loginForm.value).subscribe(
      (res)=>{
        this.auth.setUserObj(res.result.admin);
        this.auth.setUserToken(res.result.token);
        this.auth.setRole(res.result.role);
        console.log(res.result.role)
        this.router.navigate(['/dashboard']);
        this.notificationService.success('', res?.message ||"Login successful");
        this.isLoadingSubmit = false;
      },
      (err)=>{
        console.log(err)
        this.errHandle.errorHandling(err)
        // this.notificationService.error('', err.error?.message ||"Some thing want wrong");
        this.isLoadingSubmit = false;
      }
    )
  }
}
