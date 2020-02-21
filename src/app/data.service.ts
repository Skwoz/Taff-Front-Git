import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  url: string = "http://localhost:63251/api/";



  constructor(private http: HttpClient) { }

  getAll(ctrl) {
      return this.http.get(this.url + ctrl)
  }

  get(ctrl, id) {
    return this.http.get(this.url + ctrl + "/"+ id);
  }

  post(ctrl, model) {
    return this.http.post(this.url + ctrl+"/" , model);
  }

  delete(ctrl,id) {
    return this.http.delete(this.url + ctrl + "/" + id);
  }

  modify(ctrl,id, model) {
    return this.http.put(this.url + ctrl + "/" + id, model);

  }

}
