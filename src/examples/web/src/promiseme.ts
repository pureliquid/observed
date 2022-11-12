/*export function Promisify() {
  return function _promisify<T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
      constructor(...args: any[]) {
        super(args);
        return this;
      }
    };
  };
}
*/

// @Promisify()

type Constructor<T, A = any> = new (...args: A[] /*...args: A[]*/) => T;
export type AsyncConstructor<T, A = any> = Constructor<Promise<T>, A>; // { new (...args: A[]): Promise<T> };

abstract class Promisified {
    constructor() {}
}

/*
export const Promisify = <T = Promisified>(c: T): PromisedClass<typeof c> => {
  return c as any as PromisedClass<typeof c>;
};*/

export const Promisify = <T = Promisified, A = undefined>(
    c: Constructor<T, ConstructorParameters<Constructor<T>>>
): AsyncConstructor<T, A> => {
    return c as any as AsyncConstructor<T, A>;
};

export class SampleClass {
    constructor(arg1: any, arg2: any) {
        console.log(arg1);
        return this.setup() as any;
    }

    async setup() {
        return new Promise((res) => {
            res('ok');
        });
    }
}

export interface SampleClass {
    new (): Promise<SampleClass>;
}
export const SampleClassAsync = Promisify<SampleClass, { prop1: string }>(SampleClass);

/*import SampleClass, { PromisedClass } from './sample-2-helper';

const run = async () => {
    const iPromisedClass: Promise<PromisedClass> = new SampleClass();
    console.log(iPromisedClass);
    console.log(await iPromisedClass);
};
run();*/
