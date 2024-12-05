//setting component.ts - Type Script file that contains code to provide seettings  to elearning application

//including the required files and services
import { Component, OnInit } from "@angular/core";

import { DataService } from "../../../services/data.service";
import { RestApiService } from "../../../services/rest-api.service";
import { toastType } from "../../../enum";
import { environment } from "src/environments/environment";

//componnet specific details
@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.scss"],
  standalone: false,
})

//exporting settings component
export class SettingsComponent implements OnInit {
  btnDisabled = false;
  currentSettings: any;

  constructor(private data: DataService) {}

  async ngOnInit() {
    try {
      if (!this.data.user) {
        await this.data.getProfile();
      }
      this.currentSettings = Object.assign(
        {
          newPwd: "",
          pwdConfirm: "",
        },
        this.data.user
      );
    } catch (error: any) {
      this.data.showToast(toastType.DANGER, error);
    }
  }

  validate(settings: any): any {
    if (settings["name"]) {
      if (settings["email"]) {
        if (settings["newPwd"]) {
          if (settings["pwdConfirm"]) {
            if (settings["newPwd"] === settings["pwdConfirm"]) {
              return true;
            } else {
              this.data.showToast(toastType.DANGER, "Passwords do not match.");
            }
          } else {
            this.data.showToast(
              toastType.DANGER,
              "Please enter confirmation password."
            );
          }
        } else {
          if (!settings["pwdConfirm"]) {
            return true;
          } else {
            this.data.showToast(toastType.DANGER, "Please enter new password.");
          }
        }
      } else {
        this.data.showToast(toastType.DANGER, "Please enter your email.");
      }
    } else {
      this.data.showToast(toastType.DANGER, "Please enter your name.");
    }
  }

  async update() {
    this.btnDisabled = true;
    try {
      if (this.validate(this.currentSettings)) {
        this.data
          .updateProfile({
            name: this.currentSettings["name"],
            email: this.currentSettings["email"],
            password: this.currentSettings["newPwd"],
            isSeller: this.currentSettings["isSeller"],
          })
          .then((data: any) => {
            data["success"]
              ? (this.data.getProfile(),
                this.data.showToast(toastType.SUCCESS, data["message"]))
              : this.data.showToast(toastType.DANGER, data["message"]);
          });
      }
    } catch (error: any) {
      this.data.showToast(toastType.DANGER, error["message"]);
    }
    this.btnDisabled = false;
  }
}
