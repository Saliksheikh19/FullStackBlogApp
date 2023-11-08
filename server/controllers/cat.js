import {Category}  from "../models/Category.js"

export const addCategory= async (req, res) => {
    try {
        const newCat = await Category.create(req.body);
        res.status(200).send({
            status: 'Success',
            message: 'cat created successfully',
            cat: newCat
        })
    } catch (error) {
        res.status(500).send({
            status: 'Failed',
            message: error.message
        })
    }
}

export const getAllCats= async (req, res) => {
    try {
        const cats = await Category.find();
        res.status(200).send({
           data : [...cats]
        }
       
            
        )
    } catch (error) {
        res.status(500).send({
            status: 'Failed',
            message: error.message
        })
    }
}