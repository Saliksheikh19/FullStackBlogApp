import bcrypt from "bcrypt";
import { User } from "../models/User.js";

export const getUsers = (req, res) => {
    res.status(200).send('here are your users')
    console.log('here are your user');
}

export const updateUser = async (req, res) => {
    if(req.body.userId === req.params.id || req.body.isAdmin){
        if(req.body.password){
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
                
            } catch (error) {
                return res.status(500).send(error)
            }
        }

        try {
            const user = await User.findByIdAndUpdate(req.params.id, {$set: req.body});
            res.status(200).send({
                status: 'success',
                message: 'User updated successfully',
                updatedUser: user
            })

        } catch (error) {
            return res.status(500).send(error);
        }
    } else {
        return res.status(401).send('cannot update this account')
    }
}


export const deleteUser = async (req, res) => {
    if(req.body.userId === req.params.id || req.body.isAdmin){
        try {
            const user = await User.findByIdAndDelete(req.params.id)
            res.status(200).send({
                status: 'Success',
                message: 'User deleted successfully'
            })
        } catch (error) {
            return res.status(500).send(error);
        }
    } else {
        return res.status(500).send('cannot delete this account')
    }
}

// Get A user

export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.status(200).send({
            status: 'Success',
            mesage: 'User found',
            userDeatils: user
        })
    } catch (error) {
        return res.status(500).send(error)
    }
}

