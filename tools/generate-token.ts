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

export function generateToken() {
    const { id , name } = args(process.argv);
    const payload = {
        name: name,
        userId: id,
        roles: [],
    };
    const privateKey = fs.readFileSync(path.join(__dirname, './private.key'));

    const signInOptions: SignOptions = {
        algorithm: 'RS256',
        expiresIn: '10000 days'
    };

    return sign(payload, privateKey, signInOptions);
}

console.log(generateToken());
