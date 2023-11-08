import {User}  from "../models/User.js"
import bcrypt from "bcrypt";


export const signUp = async (req, res) => {
    console.log('signup Api working')
    // console.log(req.body);

    try {

        // hashing password

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // creating user

        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });

        // saving user in DB

        const newUser = await user.save();
        res.status(200).send({
            status: 'success',
            message: 'User registered successfully',
            userInDB: newUser
        })

    } catch (error) {
      res.status(500).send(error)

    }
}

export const logIn = async (req, res) => {
    console.log('logIn Api working')
    try {

        const user = await User.findOne({email: req.body.email});
        if(!user){
            res.status(404).send('User not found');
            return
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword){
            res.status(400).send('Incorrect password')
            return
        }
   
        res.status(200).send({
            status: 'success',
            message: 'User logged in successfully',
            loggedInUser: user
        });

    } catch (error) {
        console.log(error);
    }

}