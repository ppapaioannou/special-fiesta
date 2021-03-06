import { Component, OnInit } from '@angular/core';
import {LocationPayload} from "../../payload/location-payload";
import {UserService} from "../../service/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-near-me',
  templateUrl: './near-me.component.html',
  styleUrls: ['./near-me.component.css']
})
export class NearMeComponent implements OnInit {

  locationPayload: LocationPayload;

  constructor(private userService: UserService, private router: Router) {
    this.locationPayload = {
      address: "",
      latitude: "",
      longitude: "",
      diameterInMeters: "40000"
    }
  }

  ngOnInit(): void {
  }

  valueChanged(e: any) {
    this.locationPayload.diameterInMeters = String(e.target.value * 1000);
    if (Number(this.locationPayload.diameterInMeters) > 99000) {
      this.locationPayload.diameterInMeters = "inf"
    }
  }

  setLocation(locationPayload: LocationPayload) {
    this.locationPayload.latitude = locationPayload.latitude
    this.locationPayload.longitude = locationPayload.longitude
    this.locationPayload.address = locationPayload.address
  }

  updateDistance() {
    if (this.locationPayload.diameterInMeters == "inf") {
      //earth diameter in meters
      this.locationPayload.diameterInMeters = "12742000";
    }
    this.userService.updateUserLocation(this.locationPayload).subscribe({
      next: () => {
        console.log('user location updated successfully')
        this.router.navigateByUrl('/').then(() => console.log('redirecting to home'))
      }, error: (err) => {
        this.router.navigateByUrl('/location-error').then(() => console.log('error: ' + err.status));
      }
    });

  }

}
