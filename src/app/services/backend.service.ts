import { Injectable } from '@angular/core';
import { TranslateService } from './translate.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
@Injectable({
  providedIn: 'root'
})
export class BackendService {
  constructor(private _translateSV: TranslateService,
    private _http: HttpClient) { }
  public getText(url) {
    return this._http.get(url,   { responseType: 'text' }).map(res => res).catch((error) => {
        return Observable.throw(error);
    });
}

}
