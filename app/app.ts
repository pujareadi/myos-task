import express from 'express';
import * as bodyparser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import {ProductRoutes} from './products/products.routes.config';
import {CartRoutes} from './orders/cart.routes.config';

const app: express.Application = express();

app.use(bodyparser.json({limit: '1mb'}));
app.use(cors());
dotenv.config();

let index = expressWinston.requestWhitelist.indexOf('headers');
if (index !== -1) expressWinston.requestWhitelist.splice(index, 1);

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', req.header('Access-Control-Request-Headers'));
    if (req.method === 'OPTIONS') {
        return res.status(200).send();
    } else {
        return next();
    }
});

app.use(expressWinston.logger({
    transports: [
        new winston.transports.Console()
    ],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
    )
}));

new ProductRoutes(app);
new CartRoutes(app);

app.use(expressWinston.errorLogger({
    transports: [
        new winston.transports.Console()
    ],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
    )
}));

app.get('/', (req: express.Request, res: express.Response) => {
    res.status(200).send(`Server running at port 3000`)
});

export {app};