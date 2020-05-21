import { willDoRequest } from './requesting';
import { Storage } from './storage';

type AuthResponse =
    | SuccessAuthResponse
    | ErrorAuthResponse;

interface SuccessAuthResponse {
    token: string;
};

interface ErrorAuthResponse {
    error: string;
    error_description: string;
};

export function isSuccessResponse(response: AuthResponse): response is SuccessAuthResponse {
    return 'token' in response;
}

const STORAGE_KEY = 'token';

export default class Auth {
    static isSignedIn(): boolean {
        return !!window.localStorage.getItem(STORAGE_KEY);
    }

    static getToken() {
        return window.localStorage.getItem(STORAGE_KEY);
    }

    signInOrRegister(email: string, password: string, isRegister: boolean = false) {
        return willDoRequest<AuthResponse>(
            'POST', `/api/auth/${isRegister ? 'register' : 'login'}`,
            `username=${email}&password=${password}`,
        )
            .then((response) => {
                if (isSuccessResponse(response)) {
                    Storage.add(STORAGE_KEY, response.token);
                }
                return response;
            });
    }

    signIn(email: string, password: string) {
        return this.signInOrRegister(email, password, false);
    }

    register(email: string, password: string) {
        return this.signInOrRegister(email, password, true);
    }

    signOut(): void {
        Storage.remove(STORAGE_KEY);
    }
}
