namespace Iterators {

// {{## BEGIN iterator-itf ##}}
interface Iterable<T> {
    [Symbol.iterator]() : Iterator<T>;
}
interface Iterator<T> {
    next(value?: any): IteratorResult<T>;
    return?(value?: any): IteratorResult<T>;
    throw?(e?: any): IteratorResult<T>;
}
// {{## END iterator-itf ##}}

// {{## BEGIN example-1 ##}}
class Person { constructor(public name: string) { } }
class People implements Iterable<Person> {
    constructor(public population: Array<Person>) { }
    [Symbol.iterator]() : Iterator<Person> {
        let localPop = this.population;
        let index = 0;
        const iterator = {
            next() {
                return { value: localPop[index++], 
                    done: (index > localPop.length ? true : false) }
            }
        };
        return iterator;

        //return this.population[Symbol.iterator](); 
    }
}
// {{## END example-1 ##}}

// {{## BEGIN example-2 ##}}
const pop = new People([
    new Person("Fred"), new Person("Wilma"), 
    new Person("Barney"), new Person("Betty")])
for (let p of pop) {
    console.log(p);
}
// {{## END example-2 ##}}

}
