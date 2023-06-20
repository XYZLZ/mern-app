import {Schema, model} from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const ConmentSchema = new Schema({
    text:{type:String, required:true}, 
    
    postedBy:{type:Schema.Types.ObjectId, ref:'User', required:true},

    replies:[{
        reply:{type:String, required:true},
        postedBy:{type:Schema.Types.ObjectId, ref:'User'},
        createdAt:{type:Date, default:Date.now}
    }],

    postId:{type:Schema.Types.ObjectId, ref:'Post', required:true},

    createdAt:{type:Date, default:Date.now}
}, {versionKey:false})

ConmentSchema.plugin(mongoosePaginate);

const Conment = model('Conment', ConmentSchema);

export default Conment;