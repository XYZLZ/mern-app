import {Schema, model} from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const PostSchema = new Schema({
    name:{
        type:Schema.Types.String,
        required:true,
        ref:'User',
        trim:true
    },

    photoName:{
        type:String,
        required:true
    },

    photo:{
        type:String,
        required:true
    },

    public_id:{
        type:String
    },

    prompt:{
        type:String,
        required:true
    },

    category:{
        type:String,
        required:true,
        trim:true
    },

    isGlobal:{
        type:Boolean,
        default:false,
        required:true
    },

    hearts:[{
        heart:{
            type:Number,
            default:0
        },
        userId:{type:Schema.Types.ObjectId}
    }],

    isWithAI:{type:Boolean, default:false},

    // conments:{
    //     type:Schema.Types.ObjectId,
    //     ref:'Conment'
    // },

    owner: {
        type:Schema.Types.ObjectId,
        required:true,
        ref: 'User'
    }
}, {timestamps:true, versionKey:false})

// * virtual property
PostSchema.virtual('user', {
    ref: 'User',
    localField: 'owner',
    foreignField:'_id'

})

PostSchema.plugin(mongoosePaginate);
const Post = model('Post', PostSchema); 

export default Post