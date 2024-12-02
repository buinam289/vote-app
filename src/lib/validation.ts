import { Dispatch, SetStateAction } from 'react';
import { ZodSchema, ZodError } from 'zod';

export function clientValidate(formData: FormData, schema: ZodSchema, setState: Dispatch<SetStateAction<Record<string, string>>>): boolean {
    try {
        const record = Object.fromEntries(formData.entries()) as Record<string, string>;
        schema.parse(record);
    } catch (err) {
        if (err instanceof ZodError) {
            setState(mapToRecordError(err));
            return false;
        }
    }
    return true;
}

export function mapToRecordError(errors: ZodError) : Record<string, string> {
    const errorMap: Record<string, string> = {};
    errors.errors.forEach((error) => {
        if (error.path.length > 0) {
            errorMap[error.path[0]] = error.message;
        }
    });
    return errorMap;
}