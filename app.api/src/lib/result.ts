// @ts-ignore
import cloneDeep from 'clone-deep';
import { ResultError } from './type';

export class Result {
    public data?: StringMap = {};
    public errors: ResultError[] = [];
    public status?: Nullable<number> = null;

    public toJSON(): object {
        return {
            data: this.data,
            errors: this.errors,
        };
    }

    public setErrors(errors: ResultError) {
        this.errors = cloneDeep(errors);
    }
}
