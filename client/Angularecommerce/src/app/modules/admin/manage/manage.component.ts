import { Component, OnInit } from "@angular/core";
import { toastType } from "src/app/enum";
import { DataService } from "src/app/services/data.service";
import { RestApiService } from "src/app/services/rest-api.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  categories: any;
  newCategory = "";
  brands: any;
  newBrand = "";
  btnDisabled = false;

  constructor(private rest: RestApiService, public data: DataService) {}

  async ngOnInit() {
    try {
      this.data.getCategory().then((data: any) => {
        data["success"]
          ? (this.categories = data["categories"])
          : this.data.showToast(toastType.DANGER, data["message"]);
      });

      this.data.getBrand().then((data: any) => {
        data["success"]
          ? (this.brands = data["brands"])
          : this.data.showToast(toastType.DANGER, data["message"]);
      });
    } catch (error: any) {
      this.data.showToast(toastType.DANGER, error["message"]);
    }
  }

  async addCategory() {
    this.btnDisabled = true;
    try {
      this.data
        .postCategory({ category: this.newCategory })
        .then((data: any) => {
          data["success"]
            ? this.data.showToast(toastType.SUCCESS, data["message"])
            : this.data.showToast(toastType.DANGER, data["message"]);
        });
    } catch (error: any) {
      this.data.showToast(toastType.DANGER, error["message"]);
    }
    this.btnDisabled = false;
  }

  async addBrand() {
    try {
      this.data
        .postBrand({
          brand: this.newBrand,
        })
        .then((data: any) => {
          data["success"]
            ? this.data.showToast(toastType.SUCCESS, data["message"])
            : this.data.showToast(toastType.DANGER, data["message"]);
        });
    } catch (error: any) {
      this.data.showToast(toastType.DANGER, error["message"]);
    }
  }
}
