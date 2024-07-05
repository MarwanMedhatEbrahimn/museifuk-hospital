import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-finished-requests',
  templateUrl: './finished-requests.component.html',
  styleUrls: ['./finished-requests.component.scss']
})
export class FinishedRequestsComponent {
  @Input() dataTable:any[] = []
  @Input() isLoading:boolean = false
  @Input() serverErrorFetch:any = null
  loadingSchema: any = ['','','','','','','','','']

  @Output() openDetails= new EventEmitter<any>();

  openDetailsClick(row:any){
    this.openDetails.emit(row);
  }
}
