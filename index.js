import express from 'express';
import bodyParser from 'body-parser'
import aliensRouter from './routes/aliens.js';
import connectDB from './config/db.js';
import cors from 'cors';
import path from 'path';
import 'dotenv/config'; 


const app = express();
const PORT = process.env.PORT || 5000; 
const __dirname = path.resolve();


await connectDB();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

app.use(bodyParser.json());
app.use('./public/aliens/image', express.static(path.join(__dirname, 'public/aliens/image')));
app.use('./public/aliens/transformimg', express.static(path.join(__dirname, 'public/aliens/transformimg')));

app.use('/api/v1/:series', aliensRouter); 

app.get('/', (req,res) =>{ 
  res.send('Welcome to the Ben 10 Aliens API!');
});


app.listen(PORT,() => console.log(`Server Running on port: http://localhost:${PORT}`));