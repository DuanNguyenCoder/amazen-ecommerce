import { Injectable } from "@angular/core";
import { NavigationStart, Router } from "@angular/router";
import { RestApiService } from "./rest-api.service";
import { toastType } from "../enum";
import { environment } from "src/environments/environment";
import { HttpParams } from "@angular/common/http";

//Exporting the DataService
@Injectable({
  providedIn: "root",
})
export class DataService {
  user: any;
  deliveryDate: Date;

  toasts: { type: toastType; message: string }[] = [];

  constructor(private rest: RestApiService) {
    const today: Date = new Date();
    today.setDate(today.getDate() + 4);
    today.toISOString().split("T")[0];
    this.deliveryDate = today;
  }

  showToast(type: toastType, message: string) {
    this.toasts.push({ type, message });
    setTimeout(() => this.toasts.shift(), 3000);
  }
  removeToast(index: number) {
    this.toasts.splice(index, 1);
  }

  // product
  getProduct(params: HttpParams) {
    return this.rest.getCus(`${environment.apiURL}products`, params);
  }
  postProduct(dataProduct: FormData) {
    return this.rest.post(`${environment.apiURL}seller/products`, dataProduct);
  }
  getProductById(productId: number) {
    return this.rest.get(`${environment.apiURL}product/${productId}`);
  }
  getProductByCategory(categoryId: number, page: number) {
    return this.rest.get(
      `${environment.apiURL}categories/${categoryId}?page=${page - 1}`
    );
  }

  //auth
  getLogin(dataLogin: object) {
    return this.rest.post(`${environment.apiURL}accounts/login`, dataLogin);
  }
  postRegistry(dataRegistry: object) {
    return this.rest.post(`${environment.apiURL}accounts/signup`, dataRegistry);
  }

  // review
  postReview(dataReview: object) {
    return this.rest.post(`${environment.apiURL}review`, dataReview);
  }

  // category
  getCategory() {
    return this.rest.get(environment.apiURL + "categories");
  }
  postCategory(dataCategory: object) {
    return this.rest.post(`${environment.apiURL}categories`, dataCategory);
  }

  // brand
  getBrand() {
    return this.rest.get(environment.apiURL + "brands");
  }
  postBrand(dataBrand: object) {
    return this.rest.post(`${environment.apiURL}brands`, dataBrand);
  }
  // payment
  checkPayment(sessionId: number) {
    return this.rest.post(`${environment.apiURL}verify-payment`, {
      sessionId,
    });
  }

  // user
  getProductOrder(orderId: number) {
    return this.rest.get(`${environment.apiURL}accounts/orders/${orderId}`);
  }
  getOrder() {
    return this.rest.get(`${environment.apiURL}accounts/orders`);
  }
  getProductSold() {
    return this.rest.get(`${environment.apiURL}seller/products`);
  }
  getAddress() {
    return this.rest.get(`${environment.apiURL}accounts/address`);
  }
  postAddress(dataAddress: object) {
    return this.rest.post(`${environment.apiURL}accounts/address`, dataAddress);
  }
  updateProfile(dataUser: Object) {
    return this.rest.post(`${environment.apiURL}accounts/profile`, dataUser);
  }
  async getProfile() {
    try {
      if (localStorage.getItem("token")) {
        const data: any = await this.rest.get(
          `${environment.apiURL}accounts/profile`
        );
        this.user = data["user"];
      }
    } catch (e) {
      this.showToast(toastType.DANGER, "error");
    }
  }
}
