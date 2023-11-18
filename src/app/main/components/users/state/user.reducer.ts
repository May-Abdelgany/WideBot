import { createReducer, on } from '@ngrx/store';
import * as userActions from './user.action';
import { userState } from './user.state';
export const initialState: userState = {
    users: [],
    loading: false,
    error: null,
};


export const userReducer = createReducer(
    initialState,
    on(userActions.loadUsers, (state) => ({ ...state, loading: true, error: null })),
    on(userActions.loadUsersSuccess, (state, { users }) => ({ ...state, users, loading: false })),
    on(userActions.loadUsersFailure, (state, { error }) => ({ ...state, error, loading: false })),
    on(userActions.addUser, (state) => ({ ...state, loading: true, error: null, })),
    on(userActions.addUserSuccess, (state, { user }) => ({ ...state, users: [...state.users, user], loading: false, })),
    on(userActions.addUserFailure, (state, { error }) => ({ ...state, loading: false, error, })),
    on(userActions.updateUser, state => {
        return { ...state, error: null };
    }),
    on(userActions.updateUserSuccess, (state, { updatedUser }) => {
        const updatedUsers = state.users.map(user =>
            user.id === updatedUser.id ? { ...user, ...updatedUser } : user
        );
        return {
            ...state,
            users: updatedUsers,
        };
    }),
    on(userActions.updateUserFailure, (state, { error }) => {
        return {
            ...state,
            error: error,
        };
    }),
    on(userActions.deleteUserSuccess, (state, { userId }) => {
        const updatedUsers = state.users.filter(user => user.id !== userId);
        return {
            ...state,
            users: updatedUsers,
        };
    }),
    on(userActions.deleteUserFailure, (state, { error }) => {
        return {
            ...state,
            error: error,
        };
    }),
    on(userActions.getUser, state => {
        return {
            ...state,
            error: null,
        };
    }),
    on(userActions.getUserSuccess, (state, { user }) => {
        return {
            ...state,
            user,
        };
    }),
    on(userActions.getUserFailure, (state, { error }) => {
        return {
            ...state,
            error,
        };
    })
);



