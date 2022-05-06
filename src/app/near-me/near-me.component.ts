import { Component, OnInit } from '@angular/core';
import {LocationPayload} from "../posts/location-payload";
import {toNumbers} from "@angular/compiler-cli/src/version_helpers";
import {UserService} from "../users/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-near-me',
  templateUrl: './near-me.component.html',
  styleUrls: ['./near-me.component.css']
})
export class NearMeComponent implements OnInit {

  locationPayload: LocationPayload;
  //radius: String;

  constructor(private userService: UserService, private router: Router) {
    this.locationPayload = {
      address: "",
      latitude: "",
      longitude: "",
      diameterInMeters: "7000"
    }

    //this.radius = "7000"
  }

  ngOnInit(): void {
  }

  valueChanged(e: any) {
    this.locationPayload.diameterInMeters = String(e.target.value * 1000);
    if (Number(this.locationPayload.diameterInMeters) > 19000) {
      this.locationPayload.diameterInMeters = "inf"
    }
  }

  setLocation(locationPayload: LocationPayload) {
    this.locationPayload.latitude = locationPayload.latitude
    this.locationPayload.longitude = locationPayload.longitude
    this.locationPayload.address = locationPayload.address
  }

  updateDistance() {
    this.userService.updateUserLocation(this.locationPayload).subscribe({
      complete: () => {
        console.log('user location updated successfully')
      }, error: () => {
        console.log('user location update failed')
      }, next: () => {
        this.router.navigateByUrl('/').then(() => console.log('redirecting to home'))
      }
    });

  }

}
