import {
  Component,
  inject,
  OnDestroy,
  OnInit,
  TemplateRef,
} from "@angular/core";

import { DataService } from "../../services/data.service";

@Component({
  selector: "app-message",
  templateUrl: "./message.component.html",
  styleUrls: ["./message.component.scss"],
  standalone: false,
})
export class MessageComponent implements OnInit {
  constructor(public data: DataService) {}
  ngOnInit() {}
}
