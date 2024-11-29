//app.component.ts- TypeScript file which facilitates authorization and provides logout and search functionality to e learning client application ///

//including required services and modules
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { DataService } from "./services/data.service";
import { SearchService } from "./services/search.service";
import { HttpParams } from "@angular/common/http";
import { CartService } from "./services/cart.service";

//Component specific details
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  standalone: false,
})

//exporting the AppComponnet for reuse
export class AppComponent {
  searchTerm = "";

  constructor(
    private router: Router,
    public data: DataService,
    private searchSer: SearchService,
    public cartSer: CartService
  ) {
    try {
      this.cartSer.cartItems = this.cartSer.getCart().length;
      this.data.getProfile();
    } catch (error) {
      console.log(error);
    }
  }

  get token() {
    return localStorage.getItem("token");
  }

  closeDropdown(dropdown: any) {
    dropdown.close();
  }

  logout() {
    this.data.user = undefined;
    this.cartSer.cartItems = 0;
    localStorage.clear();
    this.router.navigate([""]);
  }

  search() {
    if (this.searchTerm) {
      const params = new HttpParams()
        .set("name", this.searchTerm)
        .set("page", this.searchSer.searchCurrentPage.value);
      this.searchSer.query = this.searchTerm;
      this.searchSer.searchWithPara(params);
      this.router.navigate(["search"], {
        queryParams: { name: this.searchTerm },
      });
    }
  }
}
