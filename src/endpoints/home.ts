import {Request, Response, NextFunction} from 'express';

let options = {
    methods: ["get"],
    endpoint: "/",
    callbackGET: function (req: Request, res: Response, next: NextFunction) {
        res.send('Hello!');
    }
}

export default options;