import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {RegisterPayload} from "../../register-payload";
import {AuthService} from "../../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register-individual',
  templateUrl: './register-individual.component.html',
  styleUrls: ['./register-individual.component.css']
})
export class RegisterIndividualComponent implements OnInit {

  registerIndividualForm: FormGroup;
  registerPayload: RegisterPayload;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router:Router) {
    this.registerIndividualForm = this.formBuilder.group({
      email: '',
      password: '',
      firstName: '',
      lastName: ''
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
    this.registerPayload.email = this.registerIndividualForm.value.email;
    this.registerPayload.password = this.registerIndividualForm.value.password;
    this.registerPayload.name = this.registerIndividualForm.value.firstName;
    this.registerPayload.lastName = this.registerIndividualForm.value.lastName;


    this.authService.register(this.registerPayload, 'individual').subscribe({
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
