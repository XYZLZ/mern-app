import {Router} from 'express'
import  * as Paypal  from '../controllers/payment.controller.js'
import UseModel from '../models/User.js'
import auth from '../middlewares/auth.js'

const router = Router();


router.post('/create-order',auth, async(req, res) => {
    try {
        const order = await Paypal.createOrder(req.body);
        res.json(order);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});


router.post('/capture-order',auth, async (req, res) => {
    const { orderID } = req.body;
    // console.log(req.body);
    try {
        const captureData = await Paypal.captureOrder(orderID);

        // if (captureData) {
        //     UseModel.findByIdAndUpdate(req.user._id, {$set:{memberType:`${typeMember}`}})
        // }
        
        res.json(captureData);
    } catch (err) {
        res.status(500).send(err.message);
    }
});


router.post('/cancel-order', async(req, res) => {
    res.status(200).json({success:true});
});

export default router