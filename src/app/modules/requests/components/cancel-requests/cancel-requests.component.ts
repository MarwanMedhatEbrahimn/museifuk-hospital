import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-cancel-requests',
  templateUrl: './cancel-requests.component.html',
  styleUrls: ['./cancel-requests.component.scss']
})
export class CancelRequestsComponent {
  @Input() dataTable:any[] = []
  @Input() isLoading:boolean = false
  @Input() serverErrorFetch:any = null
  loadingSchema: any = ['','','','','','','','','']

  @Output() openDetails= new EventEmitter<any>();

  openDetailsClick(row:any){
    this.openDetails.emit(row);
  }
}
