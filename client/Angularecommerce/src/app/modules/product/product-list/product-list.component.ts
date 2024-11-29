import { HttpParams } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { toastType } from "src/app/enum";
import { CartService } from "src/app/services/cart.service";
import { DataService } from "src/app/services/data.service";
import { SearchService } from "src/app/services/search.service";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
})
export class ProductListComponent {
  page = 0;
  value = 5;
  brands: any[] = [];
  categorys: any[] = [];
  products: any;
  price: number = 0;
  totalProduct: number = 0;
  constructor(public dataSer: DataService, private cartSer: CartService) {
    try {
      const param = new HttpParams().set("page", "0");
      this.dataSer.getProduct(param).subscribe((data: any) => {
        data["success"]
          ? (this.products = data["products"])
          : this.dataSer.showToast(
              toastType.DANGER,
              "Could not fetch products."
            );
        this.totalProduct = data["totalProducts"];
      });
    } catch (error: any) {
      this.dataSer.showToast(toastType.DANGER, error["message"]);
    }
    this.dataSer.getCategory().then((e: any) => {
      this.categorys = e.categories;
    });
    this.dataSer.getBrand().then((e: any) => {
      this.brands = e.brands;
    });
  }

  addToCart(product: any) {
    this.cartSer.addToCart(product)
      ? this.dataSer.showToast(toastType.SUCCESS, "add product success")
      : this.dataSer.showToast(toastType.DANGER, "add product fail");
  }

  getProductsByPage(page: number) {
    const params = new HttpParams().set("page", page.toString());
    this.dataSer.getProduct(params).subscribe((data: any) => {
      data["success"]
        ? (this.products = data["products"])
        : this.dataSer.showToast(toastType.DANGER, "Could not fetch products.");
    });
  }
}
