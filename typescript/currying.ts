// These come from https://medium.freecodecamp.org/typescript-curry-ramda-types-f747e99744ab
//
const fn00 = (name: string, age: number, single: boolean) => true
type test07 = Parameters<typeof fn00>

// Re-coded version of Parameters
type Params<F extends (...args: any[]) => any> =
    F extends ((...args: infer A) => any)
    ? A
    : never

type test08 = Params<typeof fn00>

// Extract first type of a tuple
type Head<T extends any[]> = T extends [any, ...any[]] ? T[0] : never

type test9 = Head<[1, 2, string, number]>  // 1
type test10 = Head<Params<typeof fn00>>    // string

type Tail<T extends any[]> = ((...t: T) => any) extends ((_: any, ...tail: infer TT) => any) ? TT : never

type test11 = Tail<[1, 2, string, number]> // [2, string, number]
type test12 = Tail<Params<typeof fn00>>  // [number, boolean]
type test13 = Tail<test12> // [boolean]

type HasTail<T extends any[]> = T extends ([] | [any]) ? false : true
type params = [1, 2, string]
type test16 = HasTail<Tail<Tail<params>>>  // false

/*
extends: 
To keep it simple, you are allowed to think of it as if it was our dear old JavaScript’s ===. When you do so, you can see an extends statement as a simple ternary, and then it becomes much simpler to understand. In this case, extends is referred to as a conditional type.

type: 
I like to think of a type as if it was a function, but for types. It has an input, which are types (called generics) and has an output. The output depends on the “logic” of a type, and extends is that block of logic, similar to an if clause (or ternary).

infer:
It is the magnifying glass of TypeScript, a beautiful inspecting tool that can extract types that are trapped inside different kinds of structures!
 */

// Extract a property's type from an object
type ObjectInfer<O> = O extends { a: infer A } ? A : never

const object = { a: 'hello' }
type test17 = ObjectInfer<object> // string
type test18 = ObjectInfer<string> // never -- no "a" field

// Extract inner types from function types
type FunctionInfer<F> = F extends (...args: infer A) => infer R ? [A,R] : never

const fn01 = (a: number, b: any) => true
type test19 = FunctionInfer<typeof fn01> // [[number, any], boolean]

// Extract generic types from a class or interface
type ClassInfer<I> = I extends Promise<infer G> ? G : never

const promise = new Promise<string>( () => {})
type test20 = ClassInfer<typeof promise> // string


// Extract types from an array
type ArrayInfer<A> = A extends (infer U)[] ? U : never

const array = [0, 'data', 1, 'data']
type test21 = ArrayInfer<typeof array> // string | number


// Time to start currying

type CurryV0<P extends any[], R> =
    // A "classic curry" only takes one argument at a time
    (arg0: Head<P>) => HasTail<P> extends true
        // If we did not reach the end of the parameters, recurse
        ? CurryV0<Tail<P>, R>
        // Just yield up the return type
        : R

declare function curryV0<P extends any[], R>(f: (...args: P) => R): CurryV0<P,R>

const toCurry02 = (name: string, age: number, single: boolean) => true
const curried02 = curryV0(toCurry02)   // CurryV0<[string, number, boolean]
const test23 = curried02('Fred')(27)(false)  // boolean





