import express from 'express';
import cors from 'cors';
import { loadEndpoints } from './controllers/api';

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors())
app.set('port', port)

loadEndpoints(app)

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
