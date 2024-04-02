import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { loadEndpoints } from './controllers/api';

const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(cors())
app.set('port', port)

loadEndpoints(app)

export default app;