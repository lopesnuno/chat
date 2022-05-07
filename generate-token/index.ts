import { sign, SignOptions } from 'jsonwebtoken';

export function generateToken() {
    const payload = {
        name: 'Rafa',
        userId: '6jrHnwiHihRNeWqrKirW',
        roles: [
            'user',
        ]
    };
    const privateKey = fs.readFileSync(path.join(__dirname, '../../private.key'));

    const signInOptions: SignOptions = {
        algorithm: 'RS256',
        expiresIn: '10000 days'
    };

    return sign(payload, privateKey, signInOptions);
}