import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  baseURL = "https://musifuk-be.vercel.app";
  constructor(private http: HttpClient) { }

  getReq(path: string, options?: Object): Observable<any> {
    return this.http.get(`${this.baseURL}${path}`, options);
  }
 
  postReq(path: string, data?: any, options?: Object): Observable<any> {
    return this.http.post(`${this.baseURL}${path}`, data, options);
  }

  putReq(path: string, data?: any, options?: Object): Observable<any> {
    return this.http.put(`${this.baseURL}${path}`, data, options);
  }
  patchReq(path: string, data?: any, options?: Object): Observable<any> {
    return this.http.patch(`${this.baseURL}${path}`, data, options);
  }

  deleteReq(path: string, options?: Object): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: options // The data you want to send in the body
    };
    return this.http.delete(`${this.baseURL}${path}`, httpOptions);
  }



}
