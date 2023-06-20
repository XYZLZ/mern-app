import {Router} from 'express'
import Category from '../models/Category.js'
import auth from '../middlewares/auth.js'

const router =  Router();


router.get('/', auth, async(req, res) => {
    try {
        const categories = await Category.find({});

        res.status(200).json({success:true, data:categories})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Somthing goes wrong on the server (get categories)', error})
    }
})

router.post('/', async(req, res, next) => {
    try {
        const {category} = req.body;

        const findCategory = await Category.findOne({category});

        if (!category || findCategory?.category == category) {
            return res.status(400).json({message:'enter a valid category'});
        }

        const newCategory = new Category({data:category});
        await newCategory.save();

        res.status(201).json({newCategory});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Somthing goes wrong on the server (get categories)', error})
    }
})



export default router;
