
export function reduce<T, R>(
    values: { [key: string]: T; },
    result: R,
    reduce: (result: R, key: string, value: T) => R,
): R {
    for (let key in values) {
        if (!values.hasOwnProperty(key)) continue;

        result = reduce(result, key, values[key]);
    }

    return result;
}

export function filter<T>(
    values: T[],
    isThat: (value: T, index: number) => boolean,
): T[] {
    const result: T[] = [];
    for (let index = 0, length = values.length; index < length; index++) {
        const value = values[index];
        if (isThat(value, index)) {
            result.push(value);
        }
    }
    return result;
}

export function atop<T, K extends keyof T>(
    entity: T,
    part: Pick<T, K>,
): T {
    return Object.assign({}, entity, part);
}
