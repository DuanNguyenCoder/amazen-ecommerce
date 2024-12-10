import { Injectable } from "@angular/core";
import { RestApiService } from "./rest-api.service";
import { HttpParams } from "@angular/common/http";
import { DataService } from "./data.service";
import { BehaviorSubject, Observable, observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()
export class SearchService {
  query: string = "";
  searchResult = new BehaviorSubject<any>([]);
  searchCurrentPage = new BehaviorSubject<number>(0);
  isLoading = new BehaviorSubject<boolean>(false);

  constructor(private rest: RestApiService) {}

  searchWithPara(params: HttpParams) {
    try {
      this.isLoading.next(true);
      const req = this.rest
        .getCus(`${environment.apiURL}search`, params)
        .subscribe((data: any) => {
          this.searchResult.next(data["content"]);
          this.isLoading.next(false);
        });
    } catch (error: any) {
      console.log(error);
    }
    return;
  }
}
