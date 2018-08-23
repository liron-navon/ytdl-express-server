import * as express from 'express';
import * as cors from 'cors';
import { PORT } from './config';
import apiV1 from './api/v1';
const app = express();

app.use(cors());
app.use('/v1', apiV1);
app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));