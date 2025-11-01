import express from 'express';
import bodyParser from 'body-parser'
import aliensRouter from './routes/aliens.js';
import connectDB from './config/db.js';
import cors from 'cors';


const app = express();
const PORT = process.env.PORT || 5000; 

import 'dotenv/config'; 

await connectDB();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/v1/:series' ||'/api/v1/:series/id', aliensRouter); 

app.get('/', (req,res) =>{ 
  res.send('Welcome to the Ben 10 Aliens API!');
});



app.listen(PORT,() => console.log(`Server Running on port: http://localhost:${PORT}`));