/**
 * Add custom type declarations here
 */

type NullableNumber = number | null;
type NullableString = string | null;
type NullableDate = Date | null;
type NullableObject = object | null;

// used when it is required to tell that the passed object contains of string keys, and that is it
interface StringToAnyMap {
    [s: string]: NullableObject;
}

declare module '*.svg' {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const content: any;
    export default content;
}

declare module '*.png' {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const content: any;
    export default content;
}

declare global {}
