type BreakCallback<T extends (...args: any) => any, P = Parameters<T>> =
  P extends [...infer Rest, infer _Last]
    ? ((...args: Rest) => ReturnType<T>) | BreakCallback<T, Rest>
    : T;

    /*
type ForEachCallback<T> =
  | ((value: T, index: number, array: T[]) => void)
  | ((value: T, index: number) => void)
  | ((value: T) => void)
  | (() => void);
*/

// Your callback type
 type ForEachCallback<T> = BreakCallback< (value: T, index: number, array: T[]) => void>;

// Merging with the Array interface
/*
interface Array<T> {
  forEach(callbackfn: ForEachCallback<T>, thisArg?: any): void;
}
*/
const numbers: number[] = [1, 2, 3];
numbers.forEach((value: number) => console.log(value));


const items = [1, 2, 3];
items.forEach((arg: any) => console.log(arg));
items.forEach(() => console.log("just counting"));

