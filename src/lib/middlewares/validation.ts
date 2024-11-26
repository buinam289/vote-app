import { ZodSchema, ZodError } from 'zod';

export interface AppResponse<T> {
    success: boolean;
    data: T;
}

export function validate<T, R>(schema: ZodSchema, handler: (formObject: T) => Promise<AppResponse<R>>) {
    return async function (formData: FormData): Promise<AppResponse<R | Record<string, string>>> {
        let obj: T;

        try {
            const record = Object.fromEntries(formData.entries()) as Record<string, string>;
            obj = schema.parse(record);
        } catch (err) {
            if (err instanceof ZodError) {
                return {
                    success: false,
                    data: mapToRecordError(err)
                };
            }

            return {
                success: false,
                data: {'500': 'Internal Server Error'}
            };
        }

        return await handler(obj);
    };
}

function mapToRecordError(errors: ZodError) : Record<string, string> {
    const errorMap: Record<string, string> = {};
    errors.errors.forEach((error) => {
        if (error.path.length > 0) {
            errorMap[error.path[0]] = error.message;
        }
    });
    return errorMap;
}