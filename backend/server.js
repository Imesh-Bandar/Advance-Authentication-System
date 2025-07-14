import express from 'express';
import { DbConnection } from './src/config/DbConnection.js';
import AuthRouter from './src/routes/auth.route.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();
const app = express();



app.use(express.json());//allow json data to be send in request body
app.use(cookieParser());//allow cookies to be parsed

app.get('/', (req, res) => {
    res.send('Hello, World!');
});


const PORT = process.env.PORT || 6000;
app.use("/api/auth", AuthRouter);

// Error handling middleware for JSON parse errors
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({ error: "Invalid JSON payload" });
    }
    next(err);
});



app.listen(PORT, () => {
    DbConnection();
    console.log(`Server is running on port ${PORT} in ${process.env.NODE_ENV} mode`);
});

