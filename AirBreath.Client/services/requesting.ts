import { reduce } from '../common/core';
import { Storage } from './storage';

export const defaultHeaders = {
    'Accept': 'application/json',
};

export function toDefaultHeaders(
    data: Object | string | undefined,
): { [key: string]: string } {
    const token = Storage.get('token');
    const headers = {
        ...defaultHeaders,
        'Content-Type': typeof data === 'object'
            ? 'application/json'
            : 'application/x-www-form-urlencoded',
    };
    return token !== null
        ? {
            ...headers,
            'Authorization': `Bearer ${token}`,
        }
        : headers;
}

export function willDoRequest<T>(
    method: string,
    url: string,
    data: Object | string | undefined = undefined,
    toHeaders: (data: Object | string | undefined) =>
        { [key: string]: string; } = toDefaultHeaders,
): Promise<T> {

    const headers = reduce(
        toHeaders(data), new Headers(),
        (result, key, value) => {
            result.set(key, value);
            return result;
        },
    );

    return fetch(url, {
        method,
        headers,
        body: typeof data === 'object' ? JSON.stringify(data) : data,
    }).then(response => {
        if (response.status === 401) {
            // Unauthorized; redirect to sign-in
            Storage.remove('token');
            window.location.replace('/?expired=1');
        }

        const contentType = response.headers.get('content-type');
        if (contentType !== null && contentType.indexOf('application/json') !== -1) {
            return response.json();
        }
        else {
            return response.text();
        }
    });
}
