import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {
  data: any = {};
  lang: string = 'en';
  public changeLanguage = new EventEmitter<{ language: string }>();
  constructor(private http: HttpClient) { }
  use(lang: string): Promise<{}> {
    this.lang = lang;
    return new Promise<{}>((resolve, reject) => {
      const langPath = `assets/lang/${lang || 'en'}.json`;
      this.http.get<{}>(langPath).subscribe(
        translation => {
          this.data = Object.assign({}, translation || {});
          resolve(this.data);
          this.changeLanguage.emit({ language: this.lang });
        },
        error => {
          this.data = {};
          resolve(this.data);
        }
      );
    });
  }
}
