import { Component, AfterViewInit, ViewChild, ElementRef, Input, SimpleChanges, OnChanges, ChangeDetectorRef  } from '@angular/core';
import * as L from 'leaflet';
import { PusherService } from 'src/app/core/services/pusher.service';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit, OnChanges {
  private map!: L.Map;
  private marker!: L.Marker
  mapIcon = L.icon({
    iconUrl: '../../../../assets/images/map-icon.png',
    shadowUrl: '',

    iconSize:     [38, 95], // size of the icon
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});
  @Input() carDetails: any = {}
  
  @ViewChild('mapContainer') mapContainer!: ElementRef;
  private initMap(): void {
    const mapContainer = this.mapContainer.nativeElement;
    if (mapContainer) {
      this.map = L.map(mapContainer, {
        center: [51.505, -0.09],
        zoom: 13
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'map'
      }).addTo(this.map);

      this.marker = L.marker([51.505, -0.09],
        {alt: 'Kyiv'}).addTo(this.map)
        .bindPopup('Kyiv, Ukraine is the birthplace of Leaflet!');

    } else {
      console.error('Map container not found');
    }
    
  }
  carNumber: number = 0
  constructor(private pusherService: PusherService, private cdr: ChangeDetectorRef) { 
    this.pusherService.channelName = `car_${this.carDetails.carNumber}`
    pusherService.bind('positionUpdated', (data:any) => {
      console.log('Received event:', data);
      const newCenter: L.LatLngExpression = [data.lastLocation.coordinates.coordinates[0], data.lastLocation.coordinates.coordinates[1]];
      // this.map.setView(newCenter, this.map.getZoom());
      if (this.marker) {
        this.map.removeLayer(this.marker);
      }
      this.marker = L.marker(newCenter).addTo(this.map)
        .bindPopup('New Position');
    });
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
    setTimeout(() => {
      this.initMap();
    }, 1000);
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['carDetails'] && this.map) {
      const newDetails = changes['carDetails'].currentValue;
      const newCenter: L.LatLngExpression = [newDetails.lastLocation.coordinates.coordinates[0], newDetails.lastLocation.coordinates.coordinates[1]];
      this.map.setView(newCenter, this.map.getZoom());
      if (this.marker) {
        this.map.removeLayer(this.marker);
      }
      this.marker = L.marker(newCenter).addTo(this.map)
        .bindPopup('New Position');
    }
  }
}
