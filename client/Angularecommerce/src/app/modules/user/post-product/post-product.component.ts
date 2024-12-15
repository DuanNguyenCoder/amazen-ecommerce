//post-products component.ts - Type Script file that contains code to render posted products to elearning application

//including the required files and services
import { Component, OnInit } from "@angular/core";

import { Router } from "@angular/router";
import { RestApiService } from "../../../services/rest-api.service";
import { DataService } from "../../../services/data.service";
import { toastType } from "../../../enum";
import { environment } from "src/environments/environment";

//component specific details
@Component({
  selector: "app-post-product",
  templateUrl: "./post-product.component.html",
  styleUrls: ["./post-product.component.scss"],
  standalone: false,
})

//exporting PostProduct component for reuse
export class PostProductComponent implements OnInit {
  product: any = {
    title: "",
    price: 0,
    categoryId: "",
    description: "",
    product_picture: null,
  };

  categories: any;
  btnDisabled = false;

  constructor(
    private data: DataService,
    private rest: RestApiService,
    private router: Router
  ) {}

  async ngOnInit() {
    try {
      const data: any = await this.rest.get(`${environment.apiURL}categories`);
      data["success"]
        ? (this.categories = data["categories"])
        : this.data.showToast(toastType.DANGER, data["message"]);
    } catch (error: any) {
      this.data.showToast(toastType.DANGER, error["message"]);
    }
  }

  validate(product: any): any {
    if (product.title) {
      if (product.price) {
        if (product.categoryId) {
          if (product.description) {
            if (product.product_picture) {
              return true;
            } else {
              this.data.showToast(
                toastType.DANGER,
                "Please select product image."
              );
            }
          } else {
            this.data.showToast(toastType.DANGER, "Please enter description.");
          }
        } else {
          this.data.showToast(toastType.DANGER, "Please select category.");
        }
      } else {
        this.data.showToast(toastType.DANGER, "Please enter a price.");
      }
    } else {
      this.data.showToast(toastType.DANGER, "Please enter a title.");
    }
  }

  fileChange(event: any) {
    this.product.product_picture = event.target.files[0];
  }

  async post() {
    this.btnDisabled = true;
    try {
      if (this.validate(this.product)) {
        const form = new FormData();
        for (const key in this.product) {
          if (this.product.hasOwnProperty(key)) {
            if (key === "product_picture") {
              form.append(
                "product_picture",
                this.product.product_picture,
                this.product.product_picture.name
              );
            } else {
              form.append(key, this.product[key]);
            }
          }
        }
        this.data.postProduct(form).then((data: any) => {
          data["success"]
            ? this.router
                .navigate(["/profile/myproducts"])
                .then(() =>
                  this.data.showToast(toastType.SUCCESS, data["message"])
                )
                .catch((error) => this.data.showToast(toastType.DANGER, error))
            : this.data.showToast(toastType.DANGER, data["message"]);
        });
      }
    } catch (error: any) {
      this.data.showToast(toastType.DANGER, error["message"]);
    }
    this.btnDisabled = false;
  }
}
