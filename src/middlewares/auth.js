import jwt from 'jsonwebtoken';
import UserModel from '../models/User.js';


const auth = async(req, res, next) => {

    try {
        const token = req.header('authorization').replace('Bearer ', '');
        const decode = jwt.verify(token, process.env.SECRETJWT || 'bootcampTalendig');
        const user = await UserModel.findOne({_id:decode, "tokens.token":token});

        req.user = user;
        req.token = token;

        next();

    } catch (error) {
        res.status(401).json({message:'No authorized'});
    }

}


export default auth;