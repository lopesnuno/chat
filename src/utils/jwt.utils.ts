import { verify, VerifyOptions } from 'jsonwebtoken';
import * as fs from 'fs';
import * as path from 'path';

interface TokenPayload {
    exp: number;
    roles: string[];
    name: string;
    userId: string;
}

export function validateToken(token: string): Promise<TokenPayload> {
    const publicKey = fs.readFileSync(path.join(__dirname, '../../public.key'));

    const verifyOptions: VerifyOptions = {
        algorithms: ['RS256'],
    };

    return new Promise((resolve, reject) => {
        verify(token, publicKey, verifyOptions, (error, decoded: TokenPayload) => {
            if (error) return reject(error);

            resolve(decoded);
        })
    });
}