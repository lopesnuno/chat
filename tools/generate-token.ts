import { sign, SignOptions } from 'jsonwebtoken';
import * as fs from "fs";
import * as path from "path";

function args(argv: string[]) {
    const [, scriptPath, userId, userName] = argv;
    const pathParts = scriptPath.split('/');

    if (!userId) {
        console.error(`Missing user id \nUsage: ${pathParts[pathParts.length - 1]} <user Id> [<user name>]`);
        process.exit(1);
    }

    return { id: userId, name: userName || 'John Doe' }; // name is an optional param: default it if not provided
}

console.log(args(process.argv));

export function generateToken() {
    const payload = {
        name: '',
        userId: '',
        roles: [
            '',
        ]
    };
    const privateKey = fs.readFileSync(path.join(__dirname, './private.key'));

    const signInOptions: SignOptions = {
        algorithm: 'RS256',
        expiresIn: '1 hour'
    };

    return sign(payload, privateKey, signInOptions);
}

console.log(generateToken());
