import { AfterViewInit, Component, input } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent implements AfterViewInit {
  private map!: L.Map;

  lat = input<number>(32.634946);
  lng = input<number>(51.630633);
  zoomLevel = input<number>(15);
  width = input<string>('w-[300px]');
  height = input<string>('h-[300px]');

  customIcon = L.icon({
    iconUrl: 'assets/HomePage/pointer.png', // Your image path
    iconSize: [50, 50],
    iconAnchor: [23, 45],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map').setView([this.lat(), this.lng()], this.zoomLevel());
    L.marker([this.lat(), this.lng()], { icon: this.customIcon }).addTo(
      this.map
    );
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(
      this.map
    );
    this.map.attributionControl.setPrefix('');
  }
}
