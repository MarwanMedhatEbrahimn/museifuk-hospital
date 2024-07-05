import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  @Input() dataTable:any[] = []
  @Input() isLoading:boolean = false
  @Input() serverErrorFetch:any = null
  @Output() openDetails= new EventEmitter<any>();

  openDetailsClick(row:any){
    this.openDetails.emit(row);
  }
  loadingSchema: any = ['','','','','','','','','']
}
