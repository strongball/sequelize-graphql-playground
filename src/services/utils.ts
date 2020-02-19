export function SortBydIds<T extends { id: V }, V>(items: T[], ids: V[] | readonly V[]): T[] {
    return items.sort((a, b) => ids.indexOf(a.id) - ids.indexOf(b.id));
}

interface GroupReturn<T> {
    [key: string]: T[];
}
export function GroupByIds<T, V extends string | number>(
    items: T[],
    ids: V[] | readonly V[],
    key = 'id',
): GroupReturn<T> {
    const resultMap: GroupReturn<T> = {};
    ids.forEach(id => (resultMap[id] = []));
    items.forEach(item => {
        if (!item[key]) {
            new TypeError(`[GroupByIds]: ${key} not exist`);
        }
        resultMap[item[key]].push(item);
    });

    return resultMap;
}
