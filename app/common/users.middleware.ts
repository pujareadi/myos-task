import express from 'express';


// User service not implemented so just considering user_related fields in headers
// Recommend seperate USER service module with JWT token or similler authentication
export class UsersMiddleware {
    private static instance: UsersMiddleware;

    static getInstance() {
        if (!UsersMiddleware.instance) {
            UsersMiddleware.instance = new UsersMiddleware();
        }
        return UsersMiddleware.instance;
    }

    // this should handle normal user and guest user also
    validateUser(req: express.Request, res: express.Response, next: express.NextFunction) {
        if (req.headers.user_id) {
          next();
          // validate user and token (here considering userId which is not correct)
        } else {
            res.status(404).send({error: 'invalid login'});
        }
    }
}