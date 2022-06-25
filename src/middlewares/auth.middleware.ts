import { Request, Response, NextFunction } from 'express';

import { Container } from 'typedi';

import { validateToken } from '../utils/jwt.utils';

import UserService from '../modules/users/UserService';

/**
 * middleware to check whether user has access to a specific endpoint
 *
 * @param allowedRoles list of allowed access types of a specific endpoint
 */

// eslint-disable-next-line import/prefer-default-export
export const authorize = (allowedRoles: string[]) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        let jwt = req.headers.authorization;

        // verify request has token
        if (!jwt) {
            return res.status(401).json({ message: 'Invalid token ' });
        }

        // remove Bearer if using Bearer Authorization mechanism
        if (jwt.toLowerCase().startsWith('bearer')) {
            jwt = jwt.slice('bearer'.length).trim();
        }

        // verify token hasn't expired yet
        const decodedToken = await validateToken(jwt);

        const hasAccessToEndpoint = allowedRoles.length === 0 || allowedRoles.some(
            (at) => decodedToken.roles.some((uat) => uat === at)
        );

        if (!hasAccessToEndpoint) {
            return res.status(401).json({ message: 'No enough privileges to access endpoint' });
        }

        const service = Container.get<UserService>(UserService);

        req.user = await service.get(decodedToken.userId);
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            res.status(401).json({ message: 'Expired token' });
            return;
        }

        res.status(500).json({ message: 'Failed to authenticate user' });
    }
};
