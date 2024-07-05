import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ValidationService } from 'src/app/core/services/validation.service';

@Component({
  selector: 'app-form-errors',
  templateUrl: './form-errors.component.html',
  styleUrls: ['./form-errors.component.scss']
})
export class FormErrorsComponent implements OnInit {

  @Input('control') control!:any;
  @Input('form') form!:any;
  @Input('color') color!:string;

  emailRegex = this.validation.emailPattern;
  alphaRegex = this.validation.alphaPattern;
  numericalRegex = this.validation.numerical;
  floatRegex=this.validation.float

  passwordRegex = this.validation.passwordPattern;
  webSiteRegex = this.validation.webSiteValidation;
  phoneRegex = this.validation.phonePattern;
  phoneRegex2 = this.validation.validPhoneUS;
  hexColor = this.validation.hexadecimalColor;
  URlRegex = this.validation.urlPattern
  subdomainPattern = this.validation.subdomainPattern

  passwordLettersPattern = this.validation.passwordLettersPattern;
  passwordNumbersPattern = this.validation.passwordNumbersPattern;
  passwordSpecialCharPattern = this.validation.passwordSpecialCharPattern;

  constructor(private validation: ValidationService) { }

  ngOnInit(): void {
  }

  getControlName(c: AbstractControl): string | null {
    const formGroup: any = c.parent?.controls;
    if (formGroup) {
      return Object.keys(formGroup).find(name => c === formGroup[name]) || null;
    }

    return null;
  }

}
