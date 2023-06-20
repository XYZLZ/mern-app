import {Schema, model} from 'mongoose'

const verifiedModel = new Schema({
    userId:{
        type:String
    },

    uniqueString:{
        type:String,
        unique:true
    },

    createdAt:Date,

    expiresAt:Date
})


const Verified = model('userVerification', verifiedModel);


export default Verified;