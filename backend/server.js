import express from 'express';
import { DbConnection } from './config/DbConnection.js';
import AuthRouter from './routes/auth.route.js';

const app = express();

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

//DB SOURCE: mongodb+srv://imeshfsdinfo:UPcLNBT9mpDPTBHd@cluster0.ubkhpwn.mongodb.net/Auth?retryWrites=true&w=majority&appName=Cluster0
app.use(express.json());

app.use("/api/auth",AuthRouter);



app.listen(3000, () => {
    DbConnection();
    console.log('Server is running on port 3000');
});

