import express from 'express';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import auth from '../middlewares/auth.js';
import Post from '../models/Post.js';

dotenv.config();

const router = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


// * get post global
router.route('/').get(auth, async (req, res) => {
    try {
        const posts = await Post.find({isGlobal:true}).populate('owner', {
            avatar:1,
            _id:0
        });
        // const posts = await req.user.populate('posts');

        res.status(200).json({ success: true, data: posts });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Fetching posts failed, please try again' });
    }
});


// * get private post 
router.route('/mypost').get(auth, async (req, res) => {
    try {
        const posts = await Post.find({owner:req.user._id}).populate('owner', {
            avatar:1,
            _id:0
        });
        // console.log(posts);
        if (!posts) {
            return res.status(500).json({success:false, message:'no se ha encontrado el user'})
        }
        res.status(200).json({ success: true, data: posts });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Fetching posts failed, please try again', error:err });
    }
});


// * post for the landing
router.route('/public').get(async (req, res) => {
    try {
        const posts = await Post.paginate({}, {limit:14})

        res.status(200).json({ data:posts})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'somthing goes wrong on the server (getPublic post)'})
    }
})

// * get post by id
router.route('/this/:id').get(auth, async (req, res) => {
    try {
        const posts = await Post.findById(req.params.id).populate('owner', {
            avatar:1,
            _id:1
        });
        res.status(200).json({ success: true, data: posts });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Fetching posts failed, please try again' });
    }
});


// * get recomendations
router.route('/categoryshow/:id').get(auth, async (req, res) => {
    const category = req.params.id
    category[0].toUpperCase();
    try {
        const posts = await Post.find({category}).populate('owner', {
            avatar:1,
            _id:0
        });

        if (!posts || posts == [] ) {
            return res.status(400).json({message:'post not found'})
        }
        res.status(200).json({ success: true, data: posts });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Fetching posts failed, please try again' });
    }
});



// * upload to cloudinary
router.route('/').post(auth, async (req, res) => {
    try {
        const { photoName, prompt, photo, isGlobal, isWithAI, category} = req.body;

        console.log(req.body);
        // console.log(req.user);

        if (!photo || !photoName || !prompt || !category) {
            return  res.status(400).json({message:'plese send a name, photo and prompt'})
        }
        const photoUrl = await cloudinary.uploader.upload(photo);
        
        const newPost = await Post.create({
        name:req.user.user,
        prompt,
        photo: photoUrl.url,
        photoName,
        category,
        public_id:photoUrl.public_id,
        isGlobal,
        isWithAI,
        owner:req.user._id
        });

        res.status(200).json({ success: true, data: newPost });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Unable to create a post, please try again' });
    }
});


// * delete post 
router.route('/:id').delete(auth, async(req, res)=> {
    try {
        await Post.findOneAndDelete({_id:req.params.id, owner:req.user._id});
        const deletephoto = await cloudinary.image()
        res.status(200).json({message:'task deleted successfully'})
        
    } catch (error) {
        res.status(500).json({
            message:'Somthing goes wrong on the server (deleteTAsk)',
            error
        })
    }
}) 

export default router;