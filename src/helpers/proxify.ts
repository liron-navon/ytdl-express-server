import { Request } from 'express';
import { API_VERSION } from 'src/config';

// convert normal url to be proxy url
export function proxify(request: Request, urlToProxify: string) {
    return `${request.protocol}://${request.get('host')}/${API_VERSION}/proxy/${urlToProxify}`;
}