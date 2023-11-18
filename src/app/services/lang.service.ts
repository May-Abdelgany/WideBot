import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LangService {
  lang = new BehaviorSubject<string>(' ');
  body: any = document.body;
  constructor(public translate: TranslateService) {
    this.getCurrentLang();
  }



  //get current language of site
  getCurrentLang() {
    let lang = localStorage.getItem('lang');
    if (lang == 'en' || lang == null) {
      this.translate.setDefaultLang('en');
      localStorage.setItem('lang', 'en');
      this.translate.use('en');
      this.lang.next('en');
      this.body.classList.add("directionLTR");
      this.body.classList.remove("directionRTL");
    } else {
      this.translate.setDefaultLang('ar');
      localStorage.setItem('lang', 'ar');
      this.translate.use('ar');
      this.lang.next('ar');
      this.body.classList.add("directionRTL");
      this.body.classList.remove("directionLTR");
    }
  }

  //change language of site
  changeLanguage(type: string) {
    this.translate.setDefaultLang(type);
    localStorage.setItem('lang', type);
    this.translate.use(type);
    this.lang.next(type);
    if (type == 'ar') {
      this.body.classList.add("directionRTL");
      this.body.classList.remove("directionLTR");
    } else {
      this.body.classList.add("directionLTR");
      this.body.classList.remove("directionRTL");
    }
  }
}
