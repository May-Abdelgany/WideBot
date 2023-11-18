import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Routing } from 'src/app/Routes/app-routes';
import { CryptoService } from 'src/app/services/crypto.service';

@Component({
  selector: 'app-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.scss']
})
export class NotFoundPageComponent implements OnInit {
  constructor(private _CryptoService: CryptoService, private router: Router) {

  }
  ngOnInit(): void {
   
  }
  goHome(){
    if (localStorage.getItem('data')) {
      let data = JSON.parse(this._CryptoService.decryptionAES(localStorage.getItem('data') || ''))
      if (data.role == 'admin') {
        this.router.navigate([`${Routing.main.module}/${Routing.main.children.home}`])
      } else {
        this.router.navigate([`${Routing.main.module}/${Routing.main.children.home}/${Routing.main.children.userDetails}/1`])
      }
    }
  }
}
