import { ZodError, ZodSchema } from "zod";
import { mapToRecordError } from "./validation";

export function modelBinding<T, Args extends unknown[]>(scheme: ZodSchema,
    argResolvers: { [K in keyof Args]: (request: Request) => Promise<Args[K]> },
    handler: (dto: T, ...args: Args) => Promise<Response>
) {
    return async (request: Request): Promise<Response> => {
        let dto: T;
        try {
            dto = scheme.parse(await request.json()) as T;

            const resolvedArgs = await Promise.all(
                argResolvers.map((resolver) => resolver(request))
            );

            return await handler(dto, ...(resolvedArgs as Args));

        } catch (err) {
            if (err instanceof ZodError) {
                return new Response(JSON.stringify({ error: mapToRecordError(err) }), { status: 400 });
            }
            return new Response(JSON.stringify({ error: 'Invalid request data' }), { status: 400 });
        }
    };
}