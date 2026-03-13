import express from 'express';
import cors from 'cors';
import startupsRouter from './routes/startups';
import mediaRouter from './routes/media';
import path from 'path';


const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.CORS_ORIGINS?.split(',') || '*' }));
app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));

app.get('/', (req, res) => res.send('API running'));
app.use('/api/startups', startupsRouter);
app.use('/api/media', mediaRouter);

app.listen(3000, () => console.log('Server running on port 3000'));
