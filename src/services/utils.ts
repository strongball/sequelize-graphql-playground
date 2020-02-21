export function sortByKeys<T extends { id: V }, V>(items: T[], ids: readonly V[], key = "id"): T[] {
    return items.sort((a, b) => ids.indexOf(a[key]) - ids.indexOf(b[key]));
}

interface GroupReturn<T> {
    [key: string]: T[];
}
export function groupByKeys<T, V extends string | number>(items: T[], ids: readonly V[], key = "id"): GroupReturn<T> {
    const resultMap: GroupReturn<T> = {};
    ids.forEach(id => (resultMap[id] = []));
    items.forEach(item => {
        if (!item[key]) {
            new TypeError(`[groupByKeys]: ${key} not exist`);
        }
        resultMap[item[key]].push(item);
    });

    return resultMap;
}
