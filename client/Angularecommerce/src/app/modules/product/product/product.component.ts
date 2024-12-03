//product component.ts - Type Script file that contains code to render products to elearning application

//including the required files and services
import { Component, Input, OnInit } from "@angular/core";

import { ActivatedRoute, ChildActivationEnd, Router } from "@angular/router";
import { DataService } from "../../../services/data.service";
import { RestApiService } from "../../../services/rest-api.service";
import { toastType } from "../../../enum";
import { environment } from "src/environments/environment";
import { CartService } from "src/app/services/cart.service";

//component specific details
@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"],
  standalone: false,
})

//exporting Product component for reuse
export class ProductComponent implements OnInit {
  myReview = {
    title: "",
    description: "",
    rating: 0,
  };
  btnDisabled = false;

  product: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private data: DataService,
    private rest: RestApiService,
    private router: Router,
    private cartSer: CartService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((res) => {
      this.data
        .getProductById(res["id"])
        .then((data: any) => {
          console.log(data);
          data["success"]
            ? (this.product = data["product"])
            : this.router.navigate(["/"]);
        })
        .catch((error) =>
          this.data.showToast(toastType.DANGER, error["message"])
        );
    });
  }

  addToCart() {
    const res = this.cartSer.addToCart(this.product);
    res
      ? this.data.showToast(
          toastType.SUCCESS,
          "Product successfully added to cart."
        )
      : this.data.showToast(
          toastType.DANGER,
          "Product has already been added to cart."
        );
  }

  async postReview() {
    this.btnDisabled = true;
    try {
      this.data
        .postReview({
          productId: this.product._id,
          title: this.myReview.title,
          description: this.myReview.description,
          rating: this.myReview.rating,
        })
        .then((data: any) => {
          data["success"]
            ? this.data.showToast(toastType.SUCCESS, data["message"])
            : this.data.showToast(toastType.DANGER, data["message"]);
          this.btnDisabled = false;
        });
    } catch (error: any) {
      this.data.showToast(toastType.DANGER, error["message"]);
    }
  }
}
