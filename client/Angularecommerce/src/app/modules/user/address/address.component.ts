//Address component.ts - Type Script file that contains code to render adddress feature to elearning application

//including the required files and services
import { Component, OnInit } from "@angular/core";
import { DataService } from "../../../services/data.service";
import { RestApiService } from "../../../services/rest-api.service";
import { toastType } from "../../../enum";
import { environment } from "src/environments/environment";

//componnet files specifications
@Component({
  selector: "app-address",
  templateUrl: "./address.component.html",
  styleUrls: ["./address.component.scss"],
  standalone: false,
})

//exporting the addtess component
export class AddressComponent implements OnInit {
  btnDisabled = false;

  currentAddress: any;

  constructor(private data: DataService, private rest: RestApiService) {}

  async ngOnInit() {
    try {
      this.data.getAddress().then((data: any) => {
        if (JSON.stringify(data["address"]) === "{}") {
          this.data.showToast(
            toastType.WARN,
            "You have not entered your shipping address. Please enter your shipping address."
          );
        }
        this.currentAddress = data["address"];
      });
    } catch (error: any) {
      this.data.showToast(toastType.DANGER, error["message"]);
    }
  }

  updateAddress() {
    this.btnDisabled = true;
    try {
      this.data.postAddress(this.currentAddress).then(async (res: any) => {
        res["success"]
          ? (this.data.showToast(toastType.SUCCESS, res["message"]),
            await this.data.getProfile())
          : this.data.showToast(toastType.DANGER, res["message"]);
      });
    } catch (error: any) {
      this.data.showToast(toastType.DANGER, error["message"]);
    }
    this.btnDisabled = false;
  }
}
