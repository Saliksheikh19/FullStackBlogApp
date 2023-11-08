import express  from "express";
import {  updateUser, deleteUser, getUser } from "../controllers/user.js";

const usersRoutes = express.Router();

// Update user
usersRoutes.put('/:id', updateUser);

// Delete User
usersRoutes.delete('/:id', deleteUser);

// get a user
usersRoutes.get('/:id', getUser)

export default usersRoutes;
