import express from 'express';
import { logIn, signUp } from '../controllers/auth.js';

const authRoutes = express.Router();



authRoutes.post('/signUp', signUp);
authRoutes.post('/logIn', logIn);

export default authRoutes;