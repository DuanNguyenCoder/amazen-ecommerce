//rest-api.service.ts - Type script file to provide REST(GET,POST) Services in the elearning application

//including required files and services
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

//exporting the RestAPi Service
@Injectable()
export class RestApiService {
  constructor(private http: HttpClient) {}

  getHeaders() {
    const token = localStorage.getItem("token");
    return token
      ? new HttpHeaders().set("Authorization", token)
      : new HttpHeaders();
  }

  get(link: string) {
    return this.http.get(link, { headers: this.getHeaders() }).toPromise();
  }

  getCus(link: string, params?: HttpParams) {
    return this.http.get(link, { headers: this.getHeaders(), params });
  }
  post(link: string, body: any) {
    return this.http
      .post(link, body, { headers: this.getHeaders() })
      .toPromise();
  }
}
