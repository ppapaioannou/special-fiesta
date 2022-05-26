import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {RegisterPayload} from "../../../payloads/register-payload";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {LocationPayload} from "../../../payloads/location-payload";

@Component({
  selector: 'app-register-organization',
  templateUrl: './register-organization.component.html',
  styleUrls: ['./register-organization.component.css']
})
export class RegisterOrganizationComponent implements OnInit {

  registerOrganizationForm: FormGroup;
  registerPayload: RegisterPayload;

  selectedFiles?: FileList;
  previews: string[] = [];

  formData: FormData = new FormData();

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router:Router) {
    this.registerOrganizationForm = this.formBuilder.group({
      email: '',
      password: '',
      organizationName: '',
      //logo: '',
      description: '',
      //region: '',
      //address: '',
      //city: '',
      //zipCode: '',
      contactPhone: '',
      contactEmail: '',
      websiteUrl: '',
      facebookPageUrl: '',
      organizationNeeds: '',
    });
    this.registerPayload = {
      address: "",
      contactEmail: "",
      description: "",
      email: "",
      facebookPageUrl: "",
      lastName: "",
      latitude: "",
      longitude: "",
      name: "",
      organizationNeeds: "",
      password: "",
      phoneNumber: "",
      websiteUrl: "",
    };
  }

  ngOnInit() {
  }

  previewImages(event: any) {
    this.selectedFiles = event.target.files;

    this.previews = [];
    this.formData.delete('file')
    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          //console.log(e.target.result);
          this.previews.push(e.target.result);
        };

        reader.readAsDataURL(this.selectedFiles[i]);
        this.formData.append('file', this.selectedFiles[i])
        //this.postPayload.imagesData.push(this.selectedFiles[i])
      }
    }
  }

  setLocation(locationPayload: LocationPayload) {
    this.registerPayload.latitude = locationPayload.latitude;
    this.registerPayload.longitude = locationPayload.longitude;
    this.registerPayload.address =locationPayload.address;
  }

  onSubmit() {
    this.registerPayload.email = this.registerOrganizationForm.value.email;
    this.registerPayload.password = this.registerOrganizationForm.value.password;
    this.registerPayload.name = this.registerOrganizationForm.value.organizationName;
    this.registerPayload.description = this.registerOrganizationForm.value.description;
    //this.registerPayload.region = this.registerOrganizationForm.value.region;
    //this.registerPayload.address = this.registerOrganizationForm.value.address;
    //this.registerPayload.city = this.registerOrganizationForm.value.city;
    //this.registerPayload.zipCode = this.registerOrganizationForm.value.zipCode;
    this.registerPayload.phoneNumber = this.registerOrganizationForm.value.contactPhone;
    this.registerPayload.contactEmail = this.registerOrganizationForm.value.contactEmail;
    this.registerPayload.websiteUrl = this.registerOrganizationForm.value.websiteUrl;
    this.registerPayload.facebookPageUrl = this.registerOrganizationForm.value.facebookPageUrl;
    this.registerPayload.organizationNeeds = this.registerOrganizationForm.value.organizationNeeds;


    this.formData.append('request', JSON.stringify(this.registerPayload))

    this.authService.register(this.formData, 'organization', "").subscribe({
      complete: () => {
        console.log('register success')
      }, error: (err) => {
        this.router.navigateByUrl('/register-error').then(() => console.log('error: ' + err.status));
      }, next: () => {
        this.router.navigate(["register-success", this.registerPayload.email])
          .then(() => console.log('email sent'));
      }
    });
  }

}
