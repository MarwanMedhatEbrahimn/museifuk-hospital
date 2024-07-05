import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  passwordPattern = /^.(?=.*[a-z])(?=.*[0-9])(?=.*[~!@#$%^&*()_-]).{7,}$/;
  emailPattern = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  // emailPattern = (/^\\w+([-+.']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*\\\$/);
  numerical = '^[0-9]*$';
  float=/^[+-]?\d+(\.\d+)?$/
  urlPattern = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
  facebookPattern = /http(?:s):\/\/(?:www\.)facebook\.com\/.+/i;
  googlePattern = /http(?:s):\/\/(?:www\.)google\.com\/.+/i;
  yelpPattern = /http(?:s):\/\/biz.yelp\.com\/.+/i;
  // alphaPattern = /^(?:[a-zA-Z\s\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){0,25}$/;
  preventSpaces = "^[A-Za-z][A-Za-z0-9]*$";
  webSiteValidation = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
  phonePattern = /^(\([0-9]{3}\) |[0-9]{3})[0-9]{3}-[0-9]{4,5}$/;
  zipCodePattern = /\b\d{5}\b/;
  validPhoneUS = /\(\d{3}\) \d{3}-\d{4}/;
  alphaPattern = /^(?:[a-zA-Z\s\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF]))+$/;
  subdomainPattern = /^(?!:\/\/)([a-zA-Z0-9][a-zA-Z0-9-]{0,61})+[a-zA-Z0-9]$/;


  // ***** password validations
  passwordLettersPattern = /[A-Za-z]/;
  passwordCapitalLetterPatter = /[A-Z]/;
  passwordSmallLetterPatter = /[a-z]/;
  passwordNumbersPattern = /\d/;
  passwordSpecialCharPattern = /[ !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/;
  hexadecimalColor = /^#[0-9A-Fa-f]{6}$/

  private MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

  constructor() { }


  matchingPasswords(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isNotMatched = control.get('password')?.value !== control.get('password_confirmation')?.value;
      return isNotMatched ? { unmatchedPasswords: true } : null;
    };
  }
  patternWithMessage = (pattern: RegExp, error: ValidationErrors): ValidatorFn => {
    return (control: AbstractControl): any | null => {
      if (!control?.value) {
        return null;
      }

      return pattern.test(control?.value) ? null : error;
    }
  }

  patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } |null => {
      if (!control.value) {
        // if control is empty return no error
        return null;
      }

      // test the value of the control against the regexp supplied
      const valid = regex.test(control.value);

      // if true, return no error, else return error passed in the second parameter
      return valid ? null : error;
    };
  }

  isValidPositiveInteger = ( error: ValidationErrors): ValidatorFn => {
    return (control: AbstractControl): any | null => {
      const isValid = control?.value<=this.MAX_SAFE_INTEGER ;
      return isValid ?  null : error;
    }
  }

  noLeadingSpaceValidator(control:any) {
    if (control.value && control.value.charAt(0) === ' ') {
      return { leadingSpace: true };
    }else if(control.value && control.value.charAt(control.value.length -1) === ' '){
      return { endingSpace: true };
    }
    return null;
  }

}
