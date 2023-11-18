import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import * as userActions from './user.action';
import { GlobalService } from 'src/app/main/services/global.service';


@Injectable()
export class UserEffects {

    loadUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(userActions.loadUsers),
            mergeMap(() =>
                this.GlobalService.getData('users').pipe(
                    map(users => userActions.loadUsersSuccess({ users })),
                    catchError(error => of(userActions.loadUsersFailure({ error })))
                )
            )
        )
    );
    addUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(userActions.addUser),
            mergeMap((action) =>
                this.GlobalService.addData('users', action.user).pipe(
                    map((user) => userActions.addUserSuccess({ user })),
                    catchError(error => of(userActions.addUserFailure({ error: error.message })))
                )
            )
        )
    );

    updateUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(userActions.updateUser),
            switchMap(action =>
                this.GlobalService.putData(`/users/${action.updatedUser.id}`, action.updatedUser).pipe(
                    map(updatedUser => userActions.updateUserSuccess({ updatedUser })),
                    catchError(error => of(userActions.updateUserFailure({ error })))
                )
            )
        )
    );

    deleteUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(userActions.deleteUser),
            switchMap(action =>
                this.GlobalService.deleteData(`users/${action.userId}`, action.userId).pipe(
                    map(() => userActions.deleteUserSuccess({ userId: action.userId })),
                    catchError(error => of(userActions.deleteUserFailure({ error })))
                )
            )
        )
    )
    getUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(userActions.getUser),
            switchMap(action =>
                this.GlobalService.getData(`users/${action.userId}`).pipe(
                    map(user => userActions.getUserSuccess({ user })),
                    catchError(error => of(userActions.getUserFailure({ error })))
                )
            )
        )
    )
    constructor(
        private actions$: Actions,
        private GlobalService: GlobalService
    ) { }
}