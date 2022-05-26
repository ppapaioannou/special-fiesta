import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {UserPayload} from "../user-payload";
import {ConnectionService} from "../connection.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { }

  changePassword() {

  }

  makeProfilePrivate() {

  }

  deleteAccount() {

  }

}
