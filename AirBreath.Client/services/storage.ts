export class Storage {
    static get(key: string): string | null {
        return window.localStorage.getItem(key);
    }

    static add(key: string, value: string): void {
        return window.localStorage.setItem(key, value);
    }

    static remove(key: string): void {
        return window.localStorage.removeItem(key);
    }

    static has(key: string): boolean {
        const value = window.localStorage.getItem(key);
        return value !== null;
    }
}
