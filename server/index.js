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
app.use(express.json());
const corsOptions = {
    origin: 'https://full-stack-blog-app-nine.vercel.app/',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,application/json', // Add any custom headers
    credentials: true,
    optionsSuccessStatus: 204,
  };
  
 
app.use('/posts', postsRoutes);
app.use('/auth', authRoutes);
app.use('/user', usersRoutes);
app.use('/category', categoryRoutes);
app.use(cors(corsOptions));
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