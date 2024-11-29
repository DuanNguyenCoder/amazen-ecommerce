//app-routing.module.ts- Module which handles various routes in  learning client application ///

//including required services and modules
import { Component, NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./layouts/home/home.component";
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

import { AuthGuardService } from "./services/auth-guard.service";
import { ManageComponent } from "./modules/admin/manage/manage.component";
import { VerifyPaymentComponent } from "./modules/product/verify-payment/verify-payment.component";
import { ProductListComponent } from "./modules/product/product-list/product-list.component";

//assigning all possible routes to variable
const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    children: [
      {
        path: "search",
        component: SearchComponent,
      },
      {
        path: "",
        component: ProductListComponent,
      },
    ],
  },
  {
    path: "cart",
    component: CartComponent,
  },
  {
    path: "manage",
    component: ManageComponent,
  },
  {
    path: "categories/:id",
    component: CategoryComponent,
  },

  {
    path: "payment",
    component: VerifyPaymentComponent,
  },
  {
    path: "product/:id",
    component: ProductComponent,
  },
  {
    path: "orders/:id",
    component: OrderdetailsComponent,
  },
  {
    path: "register",
    component: RegistrationComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "login",
    component: LoginComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "profile/settings",
    component: SettingsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "profile/address",
    component: AddressComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "profile/postproduct",
    component: PostProductComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "profile/myproducts",
    component: MyProductsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "profile/orders",
    component: MyordersComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: "**",
    redirectTo: "",
  },
];

//decorator to import and export routing Module in the application
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
