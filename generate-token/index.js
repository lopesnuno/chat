"use strict";
exports.__esModule = true;
exports.generateToken = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var fs = require("fs");
var path = require("path");
function generateToken() {
    var payload = {
        name: 'Rafa',
        userId: '6jrHnwiHihRNeWqrKirW',
        roles: [
            'user',
        ]
    };
    var privateKey = fs.readFileSync(path.join(__dirname, './private.key'));
    var signInOptions = {
        algorithm: 'RS256',
        expiresIn: '10000 days'
    };
    return (0, jsonwebtoken_1.sign)(payload, privateKey, signInOptions);
}
exports.generateToken = generateToken;
console.log(generateToken());
