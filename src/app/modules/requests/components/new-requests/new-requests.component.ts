import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-new-requests',
  templateUrl: './new-requests.component.html',
  styleUrls: ['./new-requests.component.scss']
})
export class NewRequestsComponent {
  @Input() dataTable:any[] = []
  @Input() isLoading:boolean = false
  @Input() serverErrorFetch:any = null
  loadingSchema: any = ['','','','','','','','','']
  @Output() openDetails= new EventEmitter<any>();

  openDetailsClick(row:any){
    this.openDetails.emit(row);
  }
}
