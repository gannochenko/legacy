/**
 * Add custom type declarations here
 */

type Nullable<X> = X | null;

interface MapStringToAny {
    [key: string]: any;
}

interface GenericClass {
    new (...args: any[]);
}

declare module '*.graphql' {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const content: any;
    export default content;
}
