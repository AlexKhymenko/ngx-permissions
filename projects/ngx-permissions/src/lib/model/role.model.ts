import { ValidationFn } from './permissions-router-data.model';

export interface NgxRole {
    name: string;
    validationFunction: ValidationFn | string[];
}
