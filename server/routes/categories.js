import express from "express";
import  {addCategory, getAllCats}  from "../controllers/cat.js";
const categoryRoutes = express.Router();


categoryRoutes.post('/', addCategory);
categoryRoutes.get('/', getAllCats);





export default categoryRoutes
