import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-in-progress-requests',
  templateUrl: './in-progress-requests.component.html',
  styleUrls: ['./in-progress-requests.component.scss']
})
export class InProgressRequestsComponent {
  @Input() dataTable:any[] = []
  @Input() isLoading:boolean = false
  @Input() serverErrorFetch:any = null
  loadingSchema: any = ['','','','','','','','','']
  @Output() openDetails= new EventEmitter<any>();

  openDetailsClick(row:any){
    this.openDetails.emit(row);
  }
}
