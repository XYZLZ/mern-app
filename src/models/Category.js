import {Schema, model} from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const CategorySchema = new Schema({
    category:{
        type:String,
        reqired:true
    }
}, {versionKey:false})

CategorySchema.plugin(mongoosePaginate);
const Category = model('category', CategorySchema);

export default Category;