import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from '../../services/global.service';
import { user } from '../../models/user.model';
import { loadUsers } from '../users/state/user.action';
import { Store } from '@ngrx/store';
import { userState } from '../users/state/user.state';
import { LoaderService } from '../../services/loader.service';
import { FormModelComponent } from '../form-model/form-model.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  user!: user
  id!: number
  constructor(private route: ActivatedRoute, public dialog: MatDialog, private _GlobalService: GlobalService, public loaderService: LoaderService) {

  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']
    this._GlobalService.user.subscribe((res) => {
      if (res) {
        this.user = this._GlobalService.user.getValue()
      } else {
        this._GlobalService.getData(`users/${this.id}`).subscribe((res) => {
          this.user = res
          this._GlobalService.user.next(this.user)
        })
      }
    })

  }
  update() {
    this.openDialog(this.id, 'updateUser')
  }
  //open modal
  openDialog(id: number, type: string) {
    const dialogRef = this.dialog.open(FormModelComponent, {
      data: { id, type }, width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
