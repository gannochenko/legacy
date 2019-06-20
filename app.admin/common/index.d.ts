/**
 * Add custom type declarations here
 */

type NullableNumber = number | null;
type NullableString = string | null;
type NullableDate = Date | null;

// used when it is required to tell that the passed object contains of string keys, and that is it
interface StringToAnyMap {
    [s: string]: any;
}

declare module '*.svg' {
    const content: any;
    export default content;
}

declare global {}
