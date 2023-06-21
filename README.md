
# TypeScript

[![GitHub Actions CI](https://github.com/microsoft/TypeScript/workflows/CI/badge.svg)](https://github.com/microsoft/TypeScript/actions?query=workflow%3ACI)
[![Devops Build Status](https://dev.azure.com/typescript/TypeScript/_apis/build/status/Typescript/node10)](https://dev.azure.com/typescript/TypeScript/_build?definitionId=7)
[![npm version](https://badge.fury.io/js/typescript.svg)](https://www.npmjs.com/package/typescript)
[![Downloads](https://img.shields.io/npm/dm/typescript.svg)](https://www.npmjs.com/package/typescript)
[![OpenSSF Scorecard](https://api.securityscorecards.dev/projects/github.com/microsoft/TypeScript/badge)](https://api.securityscorecards.dev/projects/github.com/microsoft/TypeScript)


[TypeScript](https://www.typescriptlang.org/) is a language for application-scale JavaScript. TypeScript adds optional types to JavaScript that support tools for large-scale JavaScript applications for any browser, for any host, on any OS. TypeScript compiles to readable, standards-based JavaScript. Try it out at the [playground](https://www.typescriptlang.org/play/), and stay up to date via [our blog](https://blogs.msdn.microsoft.com/typescript) and [Twitter account](https://twitter.com/typescript).

Find others who are using TypeScript at [our community page](https://www.typescriptlang.org/community/).

## Installing

For the latest stable version:

```bash
npm install -D typescript
```

For our nightly builds:

```bash
npm install -D typescript@next
```

## Contribute

There are many ways to [contribute](https://github.com/microsoft/TypeScript/blob/main/CONTRIBUTING.md) to TypeScript.
* [Submit bugs](https://github.com/microsoft/TypeScript/issues) and help us verify fixes as they are checked in.
* Review the [source code changes](https://github.com/microsoft/TypeScript/pulls).
* Engage with other TypeScript users and developers on [StackOverflow](https://stackoverflow.com/questions/tagged/typescript).
* Help each other in the [TypeScript Community Discord](https://discord.gg/typescript).
* Join the [#typescript](https://twitter.com/search?q=%23TypeScript) discussion on Twitter.
* [Contribute bug fixes](https://github.com/microsoft/TypeScript/blob/main/CONTRIBUTING.md).

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information see
the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com)
with any additional questions or comments.

## Documentation

*  [TypeScript in 5 minutes](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
*  [Programming handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
*  [Homepage](https://www.typescriptlang.org/)

## Roadmap

For details on our planned features and future direction please refer to our [roadmap](https://github.com/microsoft/TypeScript/wiki/Roadmap).

## New feature
This fork provide more strict argument checking  
so function 
with fewer parameters are not longer assignable to functions that take more parameters
contarty to https://github.com/microsoft/TypeScript/wiki/FAQ#why-are-functions-with-fewer-parameters-assignable-to-functions-that-take-more-parameters

It fixes issues :
- https://github.com/microsoft/TypeScript/issues/13043
- https://github.com/microsoft/TypeScript/issues/17868
- https://github.com/microsoft/TypeScript/issues/21868
- https://github.com/microsoft/TypeScript/issues/46881

Some code examples
```ts
// https://github.com/microsoft/TypeScript/issues/13043
const x = (a = 1): number => a;
const y: () => number = x;
// TypeScript error: "Supplied parameters do not match signature of call target."
// OK
y("x").toFixed();

const z: (a: string) => number = y;
// No TypeScript error
// Runtime error: Uncaught TypeError: z(...).toFixed is not a function
z("x").toFixed();
// user get error like expected

```

```ts
// https://github.com/microsoft/TypeScript/issues/21868
const some : ((arg: string) => boolean) = () => true;
// works user get error like expected 
```
Code bellow works without problem 
```ts
type BreakCallback<T extends (...args: any) => any, P = Parameters<T>> =
  P extends [...infer Rest, infer _Last]
    ? ((...args: Rest) => ReturnType<T>) | BreakCallback<T, Rest>
    : T;
type Callback<T> = (value: T, index: number, array: T[]) => void;
interface Array<T> {
    forEach(callbackfn: BreakCallback<Callback<T>>): void;
}
const items = [1, 2, 3];
items.forEach(arg:number => console.log(arg));
items.forEach(() => console.log("just counting"));
```
Code bellow  
there is error in hi implementation of class A
```ts
interface I {
  hi(a: string, b: string): void;
}

class A implements I {


  hi(a: string): void { //  there is ERROR
    throw new Error("Method not implemented." + a);
  }

}

class B implements I {


  hi(a: string, b: string, c: string): void {
    throw new Error("Method not implemented." + a + b);
  }

}
```
Code bellow works
there is no error becuase b is otptional parameter  
```ts
interface I {
  hi(a: string, b?: string): void;
}

class A implements I {


  hi(a: string): void { // NO ERROR HERE with new flag there is ERROR
    throw new Error("Method not implemented." + a);
  }

}


```
## Warning 

This feature is not supported by TypeScript team. 
PR was rejected https://github.com/microsoft/TypeScript/pull/54441.
If you found it useful, you use it on your owns risk.
   
