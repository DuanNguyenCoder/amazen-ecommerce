//my-products component.ts - Type Script file that contains code to render products to elearning application

//including the required files and services
import { Component, OnInit } from "@angular/core";

import { RestApiService } from "../../../services/rest-api.service";
import { DataService } from "../../../services/data.service";
import { toastType } from "../../../enum";
import { environment } from "src/environments/environment";

//component specific details
@Component({
  selector: "app-my-products",
  templateUrl: "./my-products.component.html",
  styleUrls: ["./my-products.component.scss"],
  standalone: false,
})

//exporting MyProductsComponents
export class MyProductsComponent implements OnInit {
  products: any;

  constructor(private data: DataService, private rest: RestApiService) {}

  async ngOnInit() {
    try {
      this.data.getProductSold().then((data: any) => {
        data["success"]
          ? (this.products = data["products"])
          : this.data.showToast(toastType.DANGER, data["message"]);
      });
    } catch (error: any) {
      this.data.showToast(toastType.DANGER, error["message"]);
    }
  }
}
