import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CartService } from "src/app/services/cart.service";
import { DataService } from "src/app/services/data.service";

@Component({
  selector: "app-verify-payment",
  templateUrl: "./verify-payment.component.html",
  styleUrls: ["./verify-payment.component.scss"],
})
export class VerifyPaymentComponent implements OnInit {
  payment = false;
  constructor(
    private route: ActivatedRoute,
    private dataSer: DataService,
    private cartSer: CartService
  ) {
    this.route.queryParams.subscribe(async (params) => {
      const sessionId = params["session_id"];
      if (sessionId) {
        await this.dataSer.checkPayment(sessionId).then((res: any) => {
          if (res.success) {
            this.payment = true;
            this.cartSer.clearCart();
          }
        });
      }
    });
  }

  ngOnInit(): void {}
}
