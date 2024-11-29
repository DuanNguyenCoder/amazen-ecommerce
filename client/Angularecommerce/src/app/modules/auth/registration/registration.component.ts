//Registration component.ts - Type Script file that contains code to render Registration/SignUp feature to elearning application

//including the required files and services
import { Component, OnInit } from "@angular/core";

import { RestApiService } from "../../../services/rest-api.service";
import { DataService } from "../../../services/data.service";
import { Router } from "@angular/router";
import { toastType } from "../../../enum";
import { environment } from "src/environments/environment";

//component specific details
@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.scss"],
  standalone: false,
})

//exporting Registration component for reuse
export class RegistrationComponent implements OnInit {
  name = "";
  email = "";
  password = "";
  password1 = "";
  isSeller = false;

  successDisable = true;
  btnDisabled = false;
  constructor(private data: DataService, private router: Router) {}

  ngOnInit() {}

  validate(): any {
    if (this.name) {
      if (this.email) {
        if (this.password) {
          if (this.password1) {
            if (this.password === this.password1) {
              return true;
            } else {
              this.data.showToast(toastType.DANGER, "Passwords do not match.");
            }
          } else {
            this.data.showToast(
              toastType.DANGER,
              "Confirmation Password is not entered"
            );
          }
        } else {
          this.data.showToast(toastType.DANGER, "Password is not entered");
        }
      } else {
        this.data.showToast(toastType.DANGER, "Email is not entered.");
      }
    } else {
      this.data.showToast(toastType.DANGER, "Name is not entered.");
    }
  }

  async register() {
    this.btnDisabled = true;
    try {
      if (this.validate()) {
        this.data
          .postRegistry({
            name: this.name,
            email: this.email,
            password: this.password,
            isSeller: this.isSeller,
          })
          .then(async (data: any) => {
            if (data["success"]) {
              // localStorage.setItem("token", data["token"]);
              // await this.data.getProfile();
              this.successDisable = false;
              this.data.showToast(
                toastType.SUCCESS,
                "Registration successful!"
              );
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

  navigateToLogin() {
    this.router.navigate(["/login"]);
  }
}
