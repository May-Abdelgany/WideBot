import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Routing } from 'src/app/Routes/app-routes';
import { pattern } from 'src/app/patterns/pattern';
import { CryptoService } from 'src/app/services/crypto.service';
import { LangService } from 'src/app/services/lang.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  lang!: string
  loginForm!: FormGroup
  hide = true;
  constructor(
    private _LangService: LangService,
    private fb: FormBuilder,
    private _CryptoService: CryptoService,
    private router: Router
  ) {

  }
  ngOnInit(): void {
    //save user in local storag to still loged in if reload site
    if (localStorage.getItem('data')) {
      let data = JSON.parse(this._CryptoService.decryptionAES(localStorage.getItem('data') || ''))
      if (data.role == 'admin') {
        this.router.navigate([`${Routing.main.module}/${Routing.main.children.home}`])
      } else {
        this.router.navigate([`${Routing.main.module}/${Routing.main.children.home}/${Routing.main.children.userDetails}/1`])
      }
    }
    this.generateForm()
    //get language of site
    this._LangService.lang.subscribe((res) => {
      this.lang = res
    })
  }
  //change language of site
  changeLang(type: string) {
    localStorage.setItem('lang', 'en');
    this._LangService.changeLanguage(type)
  }
  //generat form of login
  generateForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(pattern.email)]],
      password: [
        '',
        [Validators.required, Validators.pattern(pattern.password)],
      ],
      role: ['admin', [Validators.required]],
    })
  }
  //get all controls of form group
  get controls(): any {
    return this.loginForm.controls;
  }

  //login function to login in system
  login(data: any) {
    if (data.invalid) return
    let object = JSON.stringify(data.value)
    this._CryptoService.encryptionAES(object)

    if (data.value.role == 'admin') {
      this.router.navigate([`${Routing.main.module}/${Routing.main.children.home}`])
    } else {
      this.router.navigate([`${Routing.main.module}/${Routing.main.children.home}/${Routing.main.children.userDetails}/1`])
    }
  }

}
