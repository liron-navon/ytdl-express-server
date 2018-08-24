import { Request } from 'express';

'express';
export function proxify(request: Request, urlToProxify: string) {
    const pathToProxyApi = request.method + ' - ' + request.protocol + '://' + request.get('host');
    return pathToProxyApi;
}