//my-orders component.ts - Type Script file that contains code to render orders to elearning application

//including the required files and services
import { Component, OnInit } from "@angular/core";

import { RestApiService } from "../../../services/rest-api.service";
import { DataService } from "../../../services/data.service";
import { toastType } from "../../../enum";
import { environment } from "src/environments/environment";

//component specific details
@Component({
  selector: "app-myorders",
  templateUrl: "./myorders.component.html",
  styleUrls: ["./myorders.component.scss"],
  standalone: false,
})

//exporting orders component
export class MyordersComponent implements OnInit {
  myorders: any;

  constructor(private data: DataService, private rest: RestApiService) {}

  async ngOnInit() {
    try {
      this.data.getOrder().then((data: any) => {
        data["success"]
          ? (this.myorders = data["orders"])
          : this.data.showToast(toastType.DANGER, data["message"]);
      });
    } catch (error: any) {
      this.data.showToast(toastType.DANGER, error["message"]);
    }
  }
}
