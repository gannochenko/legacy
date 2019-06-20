/**
 * Add custom type declarations here
 */

type NullableNumber = number | null;
type NullableString = string | null;
type NullableDate = Date | null;

declare module '*.svg' {
    const content: any;
    export default content;
}

declare global {}
