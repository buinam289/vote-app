import { ZodSchema, ZodError } from 'zod';

export function validate(schema: ZodSchema, handler: (formData: FormData) => Promise<object | undefined>) {
    return async function (formData: FormData) {
        try {
            const obj = Object.fromEntries(formData.entries()) as Record<string, string>;
            schema.parse(obj);
        } catch (err) {
            if (err instanceof ZodError) {
                return {
                    success: false,
                    data: mapToUIError(err)
                };
            }

            return {
                success: false,
                data: 'Internal Server Error'
            };
        }

        await handler(formData);
    };
}

export function mapToUIError(errors: ZodError) : Record<string, string> {
    const errorMap: Record<string, string> = {};
    errors.errors.forEach((error) => {
        if (error.path.length > 0) {
            errorMap[error.path[0]] = error.message;
        }
    });
    return errorMap;
}