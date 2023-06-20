
import Conment from '../models/Conments.js'
import Post from '../models/Post.js';


const getConments = async(req, res) => {
    try {
        const conments = await Conment.find({}).populate('postedBy', {user:1, avatar:1,}).populate('replies.postedBy', {user:1, avatar:1,});
        res.status(200).json({success:true, data:conments})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Sonting goes wrong on the server (getConments)'});
    }
}

const createConment = async (req, res) => {
    const {text, postId} = req.body;
        // console.log(req.body);
    if (!text) {
        return res.status(400).json({message:'Write your conment to publish'})
    }

    try {
        const findPost = await Post.findOne({_id:postId}) || null;

        if (findPost === null) {
            return res.status(404).json({message:'Post not found'})
        }

        const newConment =  new Conment({text, postedBy:req.user._id, postId:postId})

        await newConment.save();

        res.status(201).json({success:'Created', newConment});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Somthing goes wrong on the server (create conment)', error})
    }
}

const updateConment = async (req, res) => {
    const {text} = req.body;

    if (!text) {
        return res.status(400).json({message:'Write your conment to publish'});
    }

    const conment = await Conment.findById(req.params.id) || null;

    if (conment === null) {
        return res.status(404).json({message:'Conment not found'});
    }

    try {
        const newConment = await Conment.findByIdAndUpdate(req.params.id, {$set:{text}});

        res.status(200).json({success:true, data:newConment});

    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Somthing goes wrong on the server (update conment)', error})
    }
}

const createReply = async (req, res) => {
    const {text} = req.body;

    if (!text) {
        return res.status(400).json({message:'Write your conment to publish'})
    }

    try {
        const findConment = await Conment.findById(req.params.id) || null;

        if (findConment === null) {
            return res.status(404).json({message:'Conment not found'})
        }

        const newConment = await Conment.findByIdAndUpdate(req.params.id, {$push:{replies:{reply:text, postedBy:req.user._id}}})
        res.status(201).json({success:'Created', newConment});
        // res.status(200).json()
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Somthing goes wrong on the server (create reply)', error})
    }

}

const deleteConment = async(req, res) => {
    const conmentId = req.params.id || undefined;

    if (!conmentId || conmentId === undefined) {
        return res.status(404).json({message:'Conment not found'});
    }
    
    const conment = await Conment.findById(conmentId) || null;
    
    if (conment === null) {
        return res.status(404).json({message:'Conment not found'})
    }

    try {
        await Conment.findByIdAndDelete(conmentId);
        res.status(200).json({success:true});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Somthing goes wrong on the server (create reply)', error})
    }


}



export {createConment, getConments, createReply, updateConment, deleteConment}