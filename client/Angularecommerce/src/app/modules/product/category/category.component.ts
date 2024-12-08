//Category component.ts - Type Script file that contains code to render Category  to elearning application

//including the required files and services
import { Component, OnInit } from "@angular/core";

import { ActivatedRoute } from "@angular/router";
import { RestApiService } from "../../../services/rest-api.service";
import { DataService } from "../../../services/data.service";
import { toastType } from "../../../enum";
import { environment } from "src/environments/environment";

//component specifc details
@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.scss"],
  standalone: false,
})

//exporting the category component
export class CategoryComponent implements OnInit {
  categoryId: any;
  category: any;
  page = 1;

  constructor(
    private data: DataService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((res) => {
      this.categoryId = res["id"];
      this.getProducts();
    });
  }

  get lower() {
    return 10 * (this.page - 1) + 1;
  }

  get upper() {
    return Math.min(10 * this.page, this.category.totalProducts);
  }

  async getProducts(event?: any) {
    if (event) {
      this.category = null;
    }
    try {
      this.data
        .getProductByCategory(this.categoryId, this.page - 1)
        .then((data: any) => {
          data["success"]
            ? (this.category = data)
            : this.data.showToast(toastType.DANGER, data["message"]);
        });
    } catch (error: any) {
      this.data.showToast(toastType.DANGER, error["message"]);
    }
  }
}
