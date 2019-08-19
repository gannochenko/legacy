/**
 * Add custom type declarations here
 */

type Nullable<X> = X | null;
type HashStringToAny = { [key: string]: any };

declare module '*.graphql' {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const content: any;
    export default content;
}
