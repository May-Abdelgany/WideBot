import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GlobalService } from '../../services/global.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { pattern } from 'src/app/patterns/pattern';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { addUser, deleteUser, loadUsers, updateUser } from '../users/state/user.action';
import { user } from '../../models/user.model';
import { userState } from '../users/state/user.state';

@Component({
    selector: 'app-form-model',
    templateUrl: './form-model.component.html',
    styleUrls: ['./form-model.component.scss']
})
export class FormModelComponent {
    sharedData!: any
    form!: FormGroup
    allCategories: any[] = [];
    user!: user
    type!: string
    constructor(private store: Store<{ users: userState }>, private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: { id: number, type: string }, private _GlobalService: GlobalService, private router: Router) {
    }

    ngOnInit() {
        this.generateForm()
        this.sharedData = this.data
        this.type = this.data.type

        if (this.sharedData.id) {
            this.getUser()
        }
    }

    getUser() {
        if (this._GlobalService.user.getValue()) {
            this.user = this._GlobalService.user.getValue()
            this.form.patchValue(this.user)
        } else {
            this._GlobalService.getData(`users/${this.sharedData.id}`).subscribe((res) => {
                if (res) {
                    this.user = res
                    this.form.patchValue(this.user)
                }
            })
        }

    }

    generateForm() {
        this.form = this.fb.group({
            username: ['', [Validators.required, Validators.pattern(pattern.textEnWithSpace)]],
            name: ['', [Validators.required, Validators.pattern(pattern.textEnWithSpace)]],
            email: ['', [Validators.required, Validators.pattern(pattern.email)]],
            website: ['', [Validators.required]],
            phone: ['', [Validators.required, Validators.pattern(pattern.phone)]],
        })
    }
    get controls(): any {
        return this.form.controls;
    }
    submit() {
        if (this.form.invalid) return
        if (this.sharedData.id) {
            let data = this.form.value
            data.id = this.sharedData.id
            data.company = {
                name: this.user.company.name
            }
            data.address = {
                street: this.user.address.street,
                city: this.user.address.city
            }
            this._GlobalService.user.next(data)
            this.store.dispatch(updateUser({ updatedUser: data }));
        } else {
            this._GlobalService.addData('users', this.form.value).subscribe((res) => {
                console.log(res);
                this.store.dispatch(addUser({ user: this.form.value }));
            })
        }
    }
    deleteUser() {
        let id = this.sharedData.id
        this.store.dispatch(deleteUser({ userId: id }));
    }
}
