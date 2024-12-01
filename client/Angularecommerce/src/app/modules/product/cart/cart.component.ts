//Cart component.ts - Type Script file that contains code to render cart feature to elearning application

//including the required files and services
import { Component, OnInit } from "@angular/core";

import { environment } from "../../../../environments/environment";
import { DataService } from "../../../services/data.service";
import { RestApiService } from "../../../services/rest-api.service";
import { Router } from "@angular/router";
import { toastType } from "../../../enum";
import { CartService } from "src/app/services/cart.service";
import { loadStripe } from "@stripe/stripe-js";

//componnet files specifications
@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"],
  standalone: false,
})

//exporting the cart component
export class CartComponent implements OnInit {
  btnDisabled = false;
  handler: any;

  quantities: any = [];

  constructor(
    private data: DataService,
    private rest: RestApiService,
    private router: Router,
    private cartSer: CartService
  ) {}

  trackByCartItems(index: number, item: any) {
    return item._id;
  }

  get cartItems() {
    return this.cartSer.getCart();
  }

  get cartTotal() {
    let total = 0;
    this.cartItems.forEach((data: any, index: any) => {
      total += data["price"] * this.quantities[index];
    });
    return total;
  }

  removeProduct(index: any, product: any) {
    this.quantities.splice(index, 1);
    this.cartSer.removeFromCart(product);
  }

  ngOnInit() {
    this.cartItems.forEach((data: any) => {
      this.quantities.push(1);
    });
  }

  validate(): any {
    console.log(this.data.user);
    if (!this.quantities.every((data: any) => data > 0)) {
      this.data.showToast(toastType.WARN, "Quantity cannot be less than one.");
    } else if (!localStorage.getItem("token")) {
      this.router.navigate(["/login"]).then(() => {
        this.data.showToast(
          toastType.WARN,
          "You need to login before making a purchase."
        );
      });
    } else if (!this.data.user["address"]) {
      this.router.navigate(["/profile/address"]).then(() => {
        this.data.showToast(
          toastType.WARN,
          "You need to login before making a purchase."
        );
      });
    } else {
      return true;
    }
  }

  checkout() {
    this.btnDisabled = true;
    try {
      if (this.validate()) {
        this.Pay();
      } else {
        this.btnDisabled = false;
      }
    } catch (error: any) {
      console.log(error);
    }
  }

  async Pay() {
    let products: any;
    products = [];
    this.cartItems.forEach((d: any, index: any) => {
      products.push({
        id: d["_id"],
        quantity: this.quantities[index],
      });
    });
    this.rest
      .post(`${environment.apiURL}payment`, {
        totalPrice: this.cartTotal,
        products,
      })
      .then(
        async (response: any) => {
          window.location.href = response.url; // Chuyển hướng đến trang Stripe
        },
        (error) => {
          console.error("Lỗi khi tạo session:", error);
        }
      );
  }
}
