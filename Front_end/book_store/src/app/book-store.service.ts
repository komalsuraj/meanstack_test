import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookStoreService {
  private _eventsUrl = "http://localhost:3000/api/events";
  private _specialEventsUrl = "http://localhost:3000/api/special";

  constructor(private http: HttpClient) { }

 getBooks() {
    return this.http.get<any>(this._specialEventsUrl)
  }
}
