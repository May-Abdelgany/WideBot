import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LangService } from './services/lang.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'shop';
  constructor(private _LangService: LangService) {
    this._LangService.getCurrentLang()
  }
}