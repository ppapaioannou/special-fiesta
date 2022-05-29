import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {RegistrationPayload} from "../../../payload/registration-payload";
import {AuthService} from "../../../service/auth.service";
import {Router} from "@angular/router";
import {ImageService} from "../../../service/image.service";
import {LocationPayload} from "../../../payload/location-payload";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  refToken: string;
  accountType!: string;

  registrationForm: FormGroup;
  registrationPayload: RegistrationPayload;

  previews: string[] = [];

  request: FormData = new FormData();

  constructor(private formBuilder: FormBuilder, private authService: AuthService,
              public imageService: ImageService, private router:Router) {
    // the path is /register/individual/ref/{token}
    // get only the referral token from slice
    this.refToken = router.url.slice(25);

    // the path is /register/{accountType}
    // get only the account type

    // case when refToken is present
    if (this.refToken != '') {
      this.accountType = router.url.slice(10,20)
    }
    else {
      this.accountType = router.url.slice(10)
    }


    console.log(this.accountType)

    this.registrationForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
      name: new FormControl(),

      lastName: new FormControl(),

      description: new FormControl(),
      contactPhone: new FormControl(),
      contactEmail: new FormControl(),
      websiteUrl: new FormControl(),
      facebookPageUrl: new FormControl(),
      organizationNeeds: new FormControl()
    });

    this.registrationPayload = {
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

  ngOnInit(): void { }

  setLocation(locationPayload: LocationPayload) {
    this.registrationPayload.latitude = locationPayload.latitude;
    this.registrationPayload.longitude = locationPayload.longitude;
    this.registrationPayload.address =locationPayload.address;
  }

  onSubmit() {
    this.registrationPayload.email = this.registrationForm.value['email'];
    this.registrationPayload.password = this.registrationForm.value['password'];
    this.registrationPayload.name = this.registrationForm.value['name'];

    this.registrationPayload.lastName = this.registrationForm.value['lastName'];

    this.registrationPayload.description = this.registrationForm.value['description'];
    this.registrationPayload.phoneNumber = this.registrationForm.value['contactPhone'];
    this.registrationPayload.contactEmail = this.registrationForm.value['contactEmail'];
    this.registrationPayload.websiteUrl = this.registrationForm.value['websiteUrl'];
    this.registrationPayload.facebookPageUrl = this.registrationForm.value['facebookPageUrl'];
    this.registrationPayload.organizationNeeds = this.registrationForm.value['organizationNeeds'];

    this.request.append('payload', JSON.stringify(this.registrationPayload))

    this.authService.register(this.request, this.accountType, this.refToken).subscribe({
      next: () => {
        this.router.navigate(["register-success", this.registrationPayload.email])
          .then(() => console.log('email sent'));
      },
      error: (err) => {
        this.router.navigateByUrl('/register-error')
          .then(() => console.log('error: ' + err.status));
      }
    });
  }

}
