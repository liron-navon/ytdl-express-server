import { Request } from 'express';

'express';
export function proxify(request: Request, urlToProxify: string) {
    return `${request.protocol}://${request.get('host')}/proxy/${urlToProxify}`;
}