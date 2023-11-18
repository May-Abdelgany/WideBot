import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Routing } from 'src/app/Routes/app-routes';

import { LangService } from 'src/app/services/lang.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  lang!: string
  constructor(private router: Router, private _LangService: LangService) {

  }
  ngOnInit(): void {
    //get language
    this._LangService.lang.subscribe((res) => {
      this.lang = res
    })
  }

   //change language of site
  changeLang(type: string) {
    localStorage.setItem('lang', 'en');
    this._LangService.changeLanguage(type)
  }

  //logout function
  logout() {
    localStorage.removeItem('data')
    this.router.navigate([`${Routing.auth.module}/${Routing.auth.children.login}`])
  }
}
