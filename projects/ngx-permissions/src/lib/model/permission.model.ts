import { ValidationFn } from './permissions-router-data.model';

export interface NgxPermission {
    name: string;
    validationFunction?: ValidationFn;
}
