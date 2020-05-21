import { Reducer } from 'redux';
import { atop } from '../common/core';

export interface AuthState {
    username: string;
    password: string;
    initialLoad: boolean;
    error: string | null;
}

export type AuthAction =
    | { type: 'be-opened-page'; }
    | { type: 'be-typed-username'; username: string; }
    | { type: 'be-typed-password'; password: string; }
    | { type: 'be-submited-auth-request'; }
    | { type: 'be-received-auth-error'; error: string; };

const unloadedState: AuthState = {
    username: 'user@test.com',
    password: 'P2ssw0rd!',
    initialLoad: true,
    error: null,
};

export const authReducer: Reducer<AuthState, AuthAction> = (state = unloadedState, action) => {
    switch (action.type) {
        case 'be-opened-page': return atop(state, {
            initialLoad: true,
        });
        case 'be-typed-username': return atop(state, {
            username: action.username,
        });
        case 'be-typed-password': return atop(state, {
            password: action.password,
        });
        case 'be-submited-auth-request': return atop(state, {
            initialLoad: false,
            error: null,
        });
        case 'be-received-auth-error': return atop(state, {
            error: action.error,
        });
        default:
            return state;
    }
};
