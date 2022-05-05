import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {RegisterPayload} from "../../register-payload";
import {AuthService} from "../../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register-organization',
  templateUrl: './register-organization.component.html',
  styleUrls: ['./register-organization.component.css']
})
export class RegisterOrganizationComponent implements OnInit {

  registerOrganizationForm: FormGroup;
  registerPayload: RegisterPayload;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router:Router) {
    this.registerOrganizationForm = this.formBuilder.group({
      email: '',
      password: '',
      organizationName: '',
      logo: '',
      description: '',
      region: '',
      address: '',
      city: '',
      zipCode: '',
      contactPhone: '',
      contactEmail: '',
      websiteUrl: '',
      facebookPageUrl: '',
      organizationNeeds: '',
    });
    this.registerPayload = {
      address: "",
      city: "",
      contactEmail: "",
      description: "",
      email: "",
      facebookPageUrl: "",
      lastName: "",
      name: "",
      organizationNeeds: "",
      password: "",
      phoneNumber: "",
      region: "",
      websiteUrl: "",
      zipCode: ""
    };
  }

  ngOnInit() {
  }

  onSubmit() {
    this.registerPayload.email = this.registerOrganizationForm.value.email;
    this.registerPayload.password = this.registerOrganizationForm.value.password;
    this.registerPayload.name = this.registerOrganizationForm.value.organizationName;
    this.registerPayload.description = this.registerOrganizationForm.value.description;
    this.registerPayload.region = this.registerOrganizationForm.value.region;
    this.registerPayload.address = this.registerOrganizationForm.value.address;
    this.registerPayload.city = this.registerOrganizationForm.value.city;
    this.registerPayload.zipCode = this.registerOrganizationForm.value.zipCode;
    this.registerPayload.phoneNumber = this.registerOrganizationForm.value.contactPhone;
    this.registerPayload.contactEmail = this.registerOrganizationForm.value.contactEmail;
    this.registerPayload.websiteUrl = this.registerOrganizationForm.value.websiteUrl;
    this.registerPayload.facebookPageUrl = this.registerOrganizationForm.value.facebookPageUrl;
    this.registerPayload.organizationNeeds = this.registerOrganizationForm.value.organizationNeeds;


    this.authService.register(this.registerPayload, 'organization').subscribe({
      complete: () => {
        console.log('register success')
      }, error: () => {
        console.log('register failed')
      }, next: () => {
        this.router.navigate(["register-success", this.registerPayload.email])
          .then(() => console.log('email sent'));
      }
    });
  }

}
