import { createProxy } from "../proxy";
import { test, expect } from "vitest";

const proxy = createProxy('./test.json');

test('proxy', () => {
    proxy.a = 1;
    expect(proxy.a).toBe(1);
    proxy.b = { c: 2 };
    expect(proxy.b.c).toBe(2);
})

test('proxy array', () => {
    proxy.arr = [1, 2, 3];
    expect(proxy.arr[0]).toBe(1);
    expect(proxy.arr.length).toBe(3);
    proxy.arr.push(4);
    expect(proxy.arr.length).toBe(4);
})

test('deep proxy', () => {
    proxy.deep = { a: 1 };
    expect(proxy.deep.a).toBe(1);
    proxy.deep.a = "deep.a";
    expect(proxy.deep.a).toBe("deep.a");
})
