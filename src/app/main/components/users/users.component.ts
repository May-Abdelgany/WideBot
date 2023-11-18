import { Component } from '@angular/core';
import { CryptoService } from 'src/app/services/crypto.service';
import { GlobalService } from '../../services/global.service';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { userState } from './state/user.state';
import { Observable } from 'rxjs';
import { loadUsers } from './state/user.action';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  hidden: boolean = false
  name!: string
  allUsers!: any
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;
  constructor(private _CryptoService: CryptoService, public _GlobalService: GlobalService, private route: ActivatedRoute, private store: Store<{ users: userState }>) {

  }
  ngOnInit(): void {
    
     this.allUsers = this.store.select(state => state.users.users);
    // this.loading$ = this.store.select(state => state.users.loading);
    // this.error$ = this.store.select(state => state.users.error);
    this.store.dispatch(loadUsers())
    this.allUsers.subscribe((res: any) => {
      if (res.length) {
        this._GlobalService.users.next(res)
      }
    })
    let data = JSON.parse(this._CryptoService.decryptionAES(localStorage.getItem('data') || ''))
    if (data.role == 'admin') {
      this.hidden = true
    }
  }
}
