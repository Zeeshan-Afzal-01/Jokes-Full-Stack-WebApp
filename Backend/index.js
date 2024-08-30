import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';


config({ path: './config.env' });

const app = express();


app.use(cors({
  origin: process.env.FRONTEND_URL,
  optionsSuccessStatus: 200,
}));


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const jokes = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'jokes.json'), 'utf8'));


app.get('/api/jokes', (req, res) => {
  res.send(jokes);
});

app.get('/about', (req, res) => {
  res.send('Hello from Server');
});


app.listen(process.env.PORT, () => {
  console.log(`Server started at http://localhost:${process.env.PORT}`);
});
