//Homecomponent.ts - Type Script file that contains code to render home page  to elearning application

//including the required files and services
import { Component, OnInit } from "@angular/core";
import { DataService } from "../../services/data.service";
import { RestApiService } from "../../services/rest-api.service";
import { toastType } from "../../enum";
import { Router } from "@angular/router";
import { SearchService } from "src/app/services/search.service";
import { HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { CartService } from "src/app/services/cart.service";

//component specific details
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  standalone: false,
})

//Exporting the HomeComponent
export class HomeComponent {
  brands: any[] = [];
  categorys: any[] = [];
  price: number = 0;
  filter = {
    category: [] as string[],
    brand: [] as string[],
  };
  constructor(
    private searchSer: SearchService,
    public dataSer: DataService,
    private router: Router
  ) {
    this.dataSer.getCategory().then((e: any) => {
      this.categorys = e.categories;
    });
    this.dataSer.getBrand().then((e: any) => {
      this.brands = e.brands;
    });
  }

  filterPrice() {
    const params = new HttpParams()
      .set("minPrice", 0)
      .set("maxPrice", this.price)
      .set("page", this.searchSer.searchCurrentPage.value)
      .set("categories", this.filter.category.join(","))
      .set("brands", this.filter.brand.join(","));
    this.searchSer.searchWithPara(params);
    this.router.navigate(["search"], {
      queryParams: {
        minPrice: 0,
        maxPrice: this.price,
        categories: this.filter.category.join(","),
        brands: this.filter.brand.join(","),
      },
    });
  }

  filterCate(event: any, cate: any) {
    if (event.target.checked) {
      this.filter.category.push(cate.name);
    } else {
      this.filter.category = this.filter.category.filter(
        (e) => e !== cate.name
      );
    }
    console.log(this.filter.category);
  }

  filterBrand(event: any, brand: any) {
    if (event.target.checked) {
      this.filter.brand.push(brand.name);
    } else {
      this.filter.brand = this.filter.brand.filter((e) => e !== brand.name);
    }
    console.log(this.filter.brand);
  }

  test() {}
}
