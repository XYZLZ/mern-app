import UserModel from '../models/User.js';
import Post from '../models/Post.js';
import {config} from 'dotenv'
config();

// * verification by email
import {setToken, getToken, getHtml, sendVerificationMAil} from './verify.controller.js'
import {v4 as uuid} from 'uuid'




const getAllUsers = async(req, res) => {
    try {
        const users = await UserModel.find();
        res.json({
            data:users
        })
    } catch (error) {
        res.status(500).json({
            message:'Somthing goes wrong on the server (getAllUsers)', 
            error
        })
    }
}



const createUser = async(req, res) => {
    const {user, email, pass} = req.body;

    if ((!user || !email || !pass) || Object.keys(req.body).length > 3) {
        return res.status(400).json({message:'plese enter a valid user, email and pass (only 3 fields)'})
    }

    const existUser = await UserModel.findOne({user}) || null
    const existUserEmail = await UserModel.findOne({email}) || null

    if (existUser !== null || existUserEmail !== null) {
        return res.status(400).json({message:'User exist plese try to login'})
    }

    const code = uuid();

    try {
        const newUser = new UserModel({user, email, pass, code})

        const token = setToken({email, code});

        const template = getHtml(user, token);

        await sendVerificationMAil(email, template);


        await newUser.save()
        res.status(201).json({newUser, success:'Se ha enviado un correo por favor verificalo'});

        
    } catch (error) {
        res.status(500).json({
            message:'Somthing goes wrong on the server (createUser)',
            error
        })
    }
}

const getOneUser = async(req, res)  =>{
    try {
        const user = await UserModel.findOne({_id:req.user.id})

        res.status(200).json({
            data:user
        })
    } catch (error) {
        res.status(500).json({message:'Somthing goses wrong on the server (getOneUser)'})
    }
}

const getAvatarUser = async(req, res)  =>{
    try {
        const user = await UserModel.findOne({_id:req.user.id})

        res.status(200).json({
            avatar:user.avatar
        })
    } catch (error) {
        res.status(500).json({message:'Somthing goses wrong on the server (getOneUser)'})
    }
}

const updateUsers = async(req, res) => {
    let reqFields = Object.keys(req.body)
    let allowedFields = ['user', 'email', 'pass', 'avatar', 'memberType'];
    const result = reqFields.every(campo => allowedFields.includes(campo))

    if (!result || reqFields.length > allowedFields.length) {
        return res.status(400).json({message:'invalid update'})
    }

    try {
        const newUser = await UserModel.findOne({_id:req.user.id});

        if (!newUser) {
            return res.status(404).json({message:'User not found'}) 
        }

        reqFields.forEach((field) => newUser[field] = req.body[field]);

        await newUser.save();

        res.status(200).json({
            success:'Updated successfuly',
            data:newUser
        })

    } catch (error) {
        res.status(500).json({
            message:'Somthing goes wrong on the server (updateUsers)',
            error
        })
    }
}

const deleteUser = async(req , res) => {
    try {
        const userDeleted = await UserModel.findOneAndDelete({_id:req.user._id});
        if (!userDeleted) {
            return res.status(404).json({message:'User Not found'})   
        }

        await Post.deleteMany({isGlobal:false, owner:req.user._id})

        res.status(200).json({
            success:'User Deleted successfuly',
            deleted:userDeleted
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({message:'somthing goes wrong on the server (deleteUser)'})
    }
}

const userLogin = async (req, res) => {
    const {email, pass} = req.body

    if (!email || !pass) {
        return res.status(400).json({message:'Write your email and password'})
    }
    
    try {
        const user = await UserModel.findByCredentials(email, pass);

        if (user == 'error') {
            return res.status(400).json({message:'Incorrect Email or password'})
        }

        if (user.verified == false) {
            return res.status(400).json({message:'Plese verify your email'})
        }

        const token = await user.generateAuthToken();

        res.json({
            user,
            token,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:'Somthing goes wrong on the server (login)',
            error
        })
    }
}


const userConfirm = async(req, res) => {
    try {
        const {token} = req.params;
        const data = await getToken(token)

        if (data == null) {
            return res.status(400).json({message:'invalid verifacation'})
        }

        // console.log(data);
        const {email, code} = data.data;

        const user = await UserModel.findOne({email}) || null;

        if (user === null) {
            return res.status(404).json({message:'user not found'});
        }

        if (code !== user.code) {
            return res.status(401).json({message:'unauthorized code'});
        }

        user.verified = true;

        await user.save();

        res.status(200).json({success:true});


    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Somthig goes wrong on the server (confirm)'})
    }
}

const userLogout = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token)=> token.token !== req.token);
        await req.user.save();
        res.status(200).send();
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:'Somthing goes wrong on the server (logout)',
            error
        })
    }
}


const userLogoutAll = async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send();
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:'Somthing goes wrong on the server (logout)',
            error
        })
    }
}

const getLikes = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id) || null;
        
        if (post === null) {
            return res.status(404).json({message:'Post not found'});
        }

        const liked = post.hearts.some((like) => like.userId.toString() === req.user._id.toString());

        if (liked) {
            return res.status(200).json({success:true, data:post.hearts, state:true})
        }


        res.status(200).json({success:true, data:post.hearts, state:false});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Sonthing goes wrong on the server (geLikes)'});
    }
}

const userPostLikes = async(req, res) => {
    let {likes} = req.body;


    if (!likes) {
        return res.status(400).json({data:0, message:'click for your like'});
    }

    const findPost = await Post.findById(req.params.id) || null;

    if (findPost === null) {
        return res.status(404).json({data:0, message:'Post not found to like'});
    }
    
    const liked = findPost.hearts.some((like) => like.userId.toString() === req.user._id.toString());

    // console.log(liked);
    if (liked) {
        const removeLike = await Post.findByIdAndUpdate(req.params.id, {$pull:{hearts:{heart:1, userId:req.user._id}}})
        return res.status(200).json({success:true, data:removeLike.hearts, state:false});
    }

    try {
        const newLike = await Post.findByIdAndUpdate(req.params.id, {$push:{hearts:{heart:likes, userId:req.user._id}}});
        res.status(200).json({success:true, data:newLike.hearts, state:true});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Sonthing goes wrong on the server (userPost likes)'});
    }
}



export {createUser, deleteUser, getAllUsers, updateUsers, userLogin, userLogout, userLogoutAll, getOneUser, getAvatarUser, userConfirm, userPostLikes, getLikes}