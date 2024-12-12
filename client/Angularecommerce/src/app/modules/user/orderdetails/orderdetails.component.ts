//Order Details component.ts - Type Script file that contains code to render details of the order to elearning application

//including the required files and services
import { Component, OnInit } from "@angular/core";

import { ActivatedRoute, Router } from "@angular/router";
import { RestApiService } from "../../../services/rest-api.service";
import { DataService } from "../../../services/data.service";
import { toastType } from "../../../enum";
import { environment } from "src/environments/environment";

//component specific details
@Component({
  selector: "app-orderdetails",
  templateUrl: "./orderdetails.component.html",
  styleUrls: ["./orderdetails.component.scss"],
  standalone: false,
})

//exporting OrderDetails component for reuse
export class OrderdetailsComponent implements OnInit {
  orderId: any;
  products: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private data: DataService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((res) => {
      this.orderId = res["id"];
      this.getProducts();
    });
  }

  async getProducts(event?: any) {
    if (event) {
      this.products = null;
    }
    try {
      this.data.getProductOrder(this.orderId).then((data: any) => {
        data["success"]
          ? (this.products = data["order"])
          : this.data.showToast(toastType.DANGER, data["message"]);
        this.products = this.products.products;
      });
    } catch (error: any) {
      this.data.showToast(toastType.DANGER, error["message"]);
    }
  }
}
