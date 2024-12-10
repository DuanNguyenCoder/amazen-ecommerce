//Search component.ts - Type Script file that contains code to render seareched products to elearning application

//including the required files and services
import { Component, OnInit } from "@angular/core";

import { ActivatedRoute } from "@angular/router";
import { DataService } from "../../services/data.service";
import { RestApiService } from "../../services/rest-api.service";
import { toastType } from "../../enum";
import { SearchService } from "src/app/services/search.service";
import { HttpParams } from "@angular/common/http";
import { CartService } from "src/app/services/cart.service";

//component specific details
@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
  standalone: false,
})

//exporting Serach Component
export class SearchComponent {
  query!: string;
  page = 0;
  isLoading = false;
  content: any;

  constructor(
    public data: DataService,
    private searchSer: SearchService,
    private cartSer: CartService
  ) {
    this.searchSer.searchResult.subscribe((data: any) => {
      this.content = data;
      this.query = this.searchSer.query;
    });
    this.searchSer.searchCurrentPage.subscribe((data: any) => {
      this.page = data;
    });
    this.searchSer.isLoading.subscribe((loading) => {
      this.isLoading = loading;
    });
  }

  addToCart(product: any) {
    this.cartSer.addToCart(product);
  }

  getProductsByPage() {
    this.searchSer.searchCurrentPage.next(this.page);
    const params = new HttpParams()
      .set("name", this.searchSer.query)
      .set("page", this.searchSer.searchCurrentPage.value);
    this.searchSer.searchWithPara(params);
  }

  get lower() {
    return 1 + this.content.hitsPerPage * this.content.page;
  }

  get upper() {
    return Math.min(
      this.content.hitsPerPage * (this.content.page + 1),
      this.content.nbHits
    );
  }
}
