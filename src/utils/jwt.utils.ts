import * as fs from 'fs';
import * as path from 'path';

import { verify, VerifyOptions } from 'jsonwebtoken';

interface TokenPayload {
    exp: number;
    roles: string[];
    name: string;
    userId: string;
}

// eslint-disable-next-line import/prefer-default-export
export function validateToken(token: string): Promise<TokenPayload> {
    const publicKey = fs.readFileSync(path.join(__dirname, '../../tools/public.key'));

    const verifyOptions: VerifyOptions = {
        algorithms: ['RS256']
    };

    return new Promise((resolve, reject) => {
        verify(token, publicKey, verifyOptions, (error, decoded: TokenPayload) => {
            if (error) {return reject(error);}

            resolve(decoded);
        });
    });
}
