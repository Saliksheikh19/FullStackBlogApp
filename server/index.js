import express from 'express';
import mongooes from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import usersRoutes from './routes/users.js';
import postsRoutes from './routes/post.js';
import categoryRoutes from './routes/categories.js';
import  cors from 'cors'

const app = express();



const PORT = 8000;


  
app.use(cors());
app.use(express.json());
app.use('/posts', postsRoutes);
app.use('/auth', authRoutes);
app.use('/user', usersRoutes);
app.use('/category', categoryRoutes);

dotenv.config();

const connect = () => {
    mongooes
        .connect(process.env.MONGO_URL)
        .then(() => {
            console.log(`connected to DB`);
        })
        .catch((err) => {
            throw err;
        });
};

app.listen(PORT, ()=>{
    console.log("listening to the server");
    connect()
})