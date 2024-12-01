import { Injectable } from "@angular/core";

@Injectable()
export class CartService {
  cartItems = 0;
  constructor() {}

  getCart() {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
  }

  addToCart(item: string) {
    const cart: any = this.getCart();
    if (
      cart.find((data: any) => JSON.stringify(data) === JSON.stringify(item))
    ) {
      return false;
    } else {
      cart.push(item);
      this.cartItems++;
      localStorage.setItem("cart", JSON.stringify(cart));
      return true;
    }
  }

  removeFromCart(item: string) {
    let cart: any = this.getCart();
    if (
      cart.find((data: any) => JSON.stringify(data) === JSON.stringify(item))
    ) {
      cart = cart.filter(
        (data: any) => JSON.stringify(data) !== JSON.stringify(item)
      );
      this.cartItems--;
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }

  clearCart() {
    this.cartItems = 0;
    localStorage.setItem("cart", "[]");
  }
}
