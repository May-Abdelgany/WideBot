import { createAction, props } from '@ngrx/store';
import { user } from 'src/app/main/models/user.model';
export const loadUsers = createAction('[User] Load Users');
export const loadUsersSuccess = createAction('[User] Load Users Success', props<{ users: user[] }>());
export const loadUsersFailure = createAction('[User] Load Users Failure', props<{ error: any }>());
export const addUser = createAction('[User] Add User', props<{ user: user }>());
export const addUserSuccess = createAction('[User] Add User Success', props<{ user: user }>());
export const addUserFailure = createAction('[User] Add User Failure', props<{ error: any }>());
export const updateUser = createAction('[User] Update User', props<{ updatedUser: user }>());
export const updateUserSuccess = createAction('[User] Update User Success', props<{ updatedUser: user }>());
export const updateUserFailure = createAction('[User] Update User Failure', props<{ error: any }>());
export const deleteUser = createAction('[User] Delete User', props<{ userId: number }>());
export const deleteUserSuccess = createAction('[User] Delete User Success', props<{ userId: number }>());
export const deleteUserFailure = createAction('[User] Delete User Failure', props<{ error: any }>());
export const getUser = createAction('[User] Get User',props<{ userId: number }>());
export const getUserSuccess = createAction('[User] Get User Success',props<{ user: user }>());
export const getUserFailure = createAction('[User] Get User Failure',props<{ error: any }>());
