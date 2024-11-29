//Logincomponent.ts - Type Script file that contains code to render Login feature to elearning application

//including the required files and services
import { Component, OnInit } from "@angular/core";

import { Router } from "@angular/router";
import { DataService } from "../../../services/data.service";
import { RestApiService } from "../../../services/rest-api.service";
import { toastType } from "../../../enum";
import { environment } from "src/environments/environment";

//component specifc details
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  standalone: false,
})

//exporting Login Component
export class LoginComponent implements OnInit {
  email = "";
  password = "";

  btnDisabled = false;

  constructor(
    private router: Router,
    private rest: RestApiService,
    private data: DataService
  ) {}

  ngOnInit() {}

  validate(): any {
    if (this.email) {
      if (this.password) {
        return true;
      } else {
        this.data.showToast(toastType.DANGER, "Password is not entered");
      }
    } else {
      this.data.showToast(toastType.DANGER, "Email is not entered.");
    }
  }

  async login() {
    this.btnDisabled = true;
    try {
      if (this.validate()) {
        this.data
          .getLogin({
            email: this.email,
            password: this.password,
          })
          .then(async (data: any) => {
            if (data["success"]) {
              localStorage.setItem("token", data["token"]);
              await this.data.getProfile();
              this.router.navigate(["/"]);
            } else {
              this.data.showToast(toastType.DANGER, data["message"]);
            }
          });
      }
    } catch (error: any) {
      this.data.showToast(toastType.DANGER, error["message"]);
    }
    this.btnDisabled = false;
  }
}
