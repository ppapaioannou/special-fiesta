import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Injectable,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {GoogleMap} from "@angular/google-maps";
import {LocationPayload} from "../payload/location-payload";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
@Injectable({
  providedIn: 'root'
})

export class MapComponent implements OnInit, AfterViewInit {
  @ViewChild('mapSearchField') searchField!: ElementRef;
  @ViewChild('selectLocationButton') selectButton!: ElementRef;
  @ViewChild(GoogleMap) map!: GoogleMap;

  @Output() location = new EventEmitter<LocationPayload>();
  locationPayload: LocationPayload;

  latitude: number;
  longitude: number;
  address: string;

  geoCoder!: google.maps.Geocoder;

  map_zoom = 15
  map_center!: google.maps.LatLngLiteral;
  map_options: google.maps.MapOptions = {
    disableDefaultUI: true,
  }
  marker_position!: google.maps.LatLngLiteral

  constructor() {
    this.latitude = 0;
    this.longitude = 0;
    this.address = "";
    this.locationPayload = {
      address: "",
      latitude: "",
      longitude: "",
      diameterInMeters: ""
    }
  }

  ngOnInit() {
    this.geoCoder = new google.maps.Geocoder
    navigator.geolocation.getCurrentPosition((position) => {
      this.map_center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    })
    //this.setCurrentLocation();
  }

  ngAfterViewInit(): void {
    const searchBox = new google.maps.places.SearchBox(
      this.searchField.nativeElement
    );
    this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(
      this.searchField.nativeElement
    );
    //this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(
    //  this.selectButton.nativeElement
    //);
    searchBox.addListener('places_changed', () => {
      const places = searchBox.getPlaces();
      if (places!.length === 0) {
        return;
      }
      const bounds = new google.maps.LatLngBounds();
      places?.forEach(place => {
        if (!place.geometry || !place.geometry.location) {
          return;
        }
        if (place.geometry.viewport) {
          // Only geocode have viewport.
          bounds.union(place.geometry.viewport);
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          if (place.formatted_address) {
            this.address = place.formatted_address;
          }
          this.marker_position = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
          }
        } else {
          bounds.extend(place.geometry.location);
        }


      });
      this.map.fitBounds(bounds);
    });
  }

  placeMarker(event: google.maps.MapMouseEvent) {
    if (event.latLng?.lat() !== undefined && event.latLng?.lng() !== undefined) {
      this.latitude = event.latLng.lat();
      this.longitude = event.latLng.lng();
      this.getAddress(this.latitude, this.longitude);

      this.marker_position = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      }
    }
  }

  getAddress(latitude:number, longitude:number) {
    this.geoCoder.geocode({'location': {lat: Number(latitude), lng: Number(longitude)}},
      (results, status) => {
      if (status === 'OK') {
        if (results) {
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    }).then(() => console.log('setting address'));
   }

  setLocation() {
    this.locationPayload.latitude = this.latitude.toString();
    this.locationPayload.longitude = this.longitude.toString();
    this.locationPayload.address = this.address;
    this.location.emit(this.locationPayload);
  }

}
