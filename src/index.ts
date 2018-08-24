import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';

import { PORT } from 'src/config';
import apiV1 from 'api/v1';
const app = express();

process.on('uncaughtException', function(err) {
    console.error( 'UNCAUGHT EXCEPTION', err.stack, err.message );
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    const url = req.method + ' - ' + req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log(url);
    next();
})

app.use('/v1', apiV1);

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send({
        message: 'something broke!',
        error: err
    });
})

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));