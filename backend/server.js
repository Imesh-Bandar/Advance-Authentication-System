import express from 'express';
import { DbConnection } from './config/DbConnection.js';
import AuthRouter from './routes/auth.route.js';
import dotenv from 'dotenv';
dotenv.config();
const app = express();



app.use(express.json());//allow json data to be send in request body

app.get('/', (req, res) => {
    res.send('Hello, World!');
});


const PORT = process.env.PORT || 6000;
app.use("/api/auth", AuthRouter);



app.listen(PORT, () => {
    DbConnection();
    console.log(`Server is running on port ${PORT} in ${process.env.NODE_ENV} mode`);
});

