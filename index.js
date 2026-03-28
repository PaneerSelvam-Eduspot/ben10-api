import express from 'express';
import bodyParser from 'body-parser';
import aliensRouter from './routes/aliens.js';
import connectDB from './config/db.js';
import cors from 'cors';
import path from 'path';
import 'dotenv/config'; 
import swaggerSpec from './swagger.js';
import swaggerUi from 'swagger-ui-express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

const app = express();
const PORT = process.env.PORT || 5000; 
const __dirname = path.resolve();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

app.use(helmet());

app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Too many requests, slow down!' }
}));

app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(`Incoming: ${req.method} ${req.url}`);
  next();
});

app.use('/aliens/image', express.static(path.join(__dirname, 'public/aliens/image')));

app.get('/', (req, res) => { 
  res.send('Welcome to the Ben 10 Aliens API!');
});

app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/v1/aliens', aliensRouter);

const start = async () => {
  await connectDB();
  
  app.listen(PORT, () => {
    console.log(`Server Running on port: http://localhost:${PORT}`);
  });
};

start();