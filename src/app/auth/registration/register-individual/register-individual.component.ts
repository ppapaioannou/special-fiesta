import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {RegisterPayload} from "../../../payloads/register-payload";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register-individual',
  templateUrl: './register-individual.component.html',
  styleUrls: ['./register-individual.component.css']
})
export class RegisterIndividualComponent implements OnInit {

  refLink: string;

  registerIndividualForm: FormGroup;
  registerPayload: RegisterPayload;

  formData: FormData = new FormData();

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router:Router) {
    this.refLink = router.url.slice(25);
    this.registerIndividualForm = this.formBuilder.group({
      email: '',
      password: '',
      firstName: '',
      lastName: ''
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
      websiteUrl: ""
    };
  }

  ngOnInit() {
    console.log(this.refLink)
  }

  onSubmit() {
    this.registerPayload.email = this.registerIndividualForm.value.email;
    this.registerPayload.password = this.registerIndividualForm.value.password;
    this.registerPayload.name = this.registerIndividualForm.value.firstName;
    this.registerPayload.lastName = this.registerIndividualForm.value.lastName;

    this.formData.append('request', JSON.stringify(this.registerPayload))

    //localhost:4200/register-individual/ref/9a2c3516-8ea9-4ff5-aa13-7b94bad85011
    this.authService.register(this.formData, 'individual', this.refLink).subscribe({
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
