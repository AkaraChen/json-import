import fs from "fs";

const arrayProxy = (arr: any[], sync: () => void): any[] => {
    arr = arr.map((item) => {
        if (typeof item === "object") {
            return proxy(item, sync);
        }
        return item;
    })
    arr.push = (...items: any) => {
        arr.push(...items);
        sync();
        return items.length;
    }
    arr.pop = () => {
        const item = arr.pop();
        sync();
        return item;
    }
    arr.shift = () => {
        const item = arr.shift();
        sync();
        return item;
    }
    arr.unshift = (...items: any) => {
        arr.unshift(...items);
        sync();
        return items.length;
    }
    arr.splice = (start: number, deleteCount: number) => {
        const result = arr.splice(start, deleteCount);
        sync();
        return result;
    }
    arr.reverse = () => {
        arr.reverse();
        sync();
        return arr;
    }
    arr.sort = (compareFn?: (a: any, b: any) => number) => {
        arr.sort(compareFn);
        sync();
        return arr;
    }
    arr.fill = (value: any, start?: number, end?: number) => {
        arr.fill(value, start, end);
        sync();
        return arr;
    }
    arr.copyWithin = (target: number, start: number, end?: number) => {
        arr.copyWithin(target, start, end);
        sync();
        return arr;
    }
    return arr;
}

const proxy = (obj: any, sync: () => void): any => new Proxy(obj, {
    get(target, p) {
        const data = target[p];
        if (Array.isArray(data)) {
            arrayProxy(data, sync);
            return data;
        }
        if (typeof data === "object") {
            return proxy(data, sync);
        }
        return data;
    },
    set(target, p, newValue) {
        target[p] = newValue;
        sync();
        return true;
    },
});

export const createProxy = <T = any>(file: string, isPath: boolean = true): T => {
    const json = isPath
        ? JSON.parse(fs.readFileSync(file, "utf-8"))
        : file;
    const sync = () => fs.writeFileSync(file, JSON.stringify(json, null, 2));
    return proxy(json, sync);
};
