//app.module.ts- TypeScript file which acts as a entry point to e learning client application ///
//               It contains app-routing module and several components                         //
/////////////////////////////////////////////////////////////////////////////////////////////////

//Including required modules and Services
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";

import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import {
  NgbAlertModule,
  NgbCarouselModule,
  NgbCollapseModule,
  NgbDropdownModule,
  NgbPaginationModule,
  NgbRatingModule,
  NgbToastModule,
} from "@ng-bootstrap/ng-bootstrap";

import { RestApiService } from "./services/rest-api.service";
import { DataService } from "./services/data.service";
import { AuthGuardService } from "./services/auth-guard.service";

import { HomeComponent } from "./layouts/home/home.component";
import { MessageComponent } from "./components/message/message.component";
import { RegistrationComponent } from "./modules/auth/registration/registration.component";
import { LoginComponent } from "./modules/auth/login/login.component";
import { ProfileComponent } from "./modules/user/profile/profile.component";
import { SettingsComponent } from "./modules/user/settings/settings.component";
import { AddressComponent } from "./modules/user/address/address.component";
import { PostProductComponent } from "./modules/user/post-product/post-product.component";
import { MyProductsComponent } from "./modules/user/my-products/my-products.component";
import { CategoryComponent } from "./modules/product/category/category.component";
import { ProductComponent } from "./modules/product/product/product.component";
import { SearchComponent } from "./components/search/search.component";
import { CartComponent } from "./modules/product/cart/cart.component";
import { MyordersComponent } from "./modules/user/myorders/myorders.component";
import { OrderdetailsComponent } from "./modules/user/orderdetails/orderdetails.component";
import { SearchService } from "./services/search.service";
import { ManageComponent } from "./modules/admin/manage/manage.component";
import { CartService } from "./services/cart.service";
import { VerifyPaymentComponent } from "./modules/product/verify-payment/verify-payment.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { MatBadgeModule } from "@angular/material/badge";
import { MatSliderModule } from "@angular/material/slider";
import { NgxMaterialRatingModule } from "ngx-material-rating";
import { ProductListComponent } from './modules/product/product-list/product-list.component';

//Module decorator specifying all the components used in the application
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MessageComponent,
    RegistrationComponent,
    LoginComponent,
    ProfileComponent,
    SettingsComponent,
    AddressComponent,
    PostProductComponent,
    MyProductsComponent,
    CategoryComponent,
    ProductComponent,
    SearchComponent,
    CartComponent,
    MyordersComponent,
    OrderdetailsComponent,
    ManageComponent,
    VerifyPaymentComponent,
    ProductListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbRatingModule,
    NgbPaginationModule,
    NgbCollapseModule,
    NgbDropdownModule,
    NgbAlertModule,
    NgbCarouselModule,
    NgbToastModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatBadgeModule,
    MatSliderModule,
    NgxMaterialRatingModule,
  ],
  providers: [
    RestApiService,
    DataService,
    AuthGuardService,
    SearchService,
    CartService,
  ],
  bootstrap: [AppComponent],
})
//Exporting the AppModule
export class AppModule {}
