import {Schema, model} from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Post from './Post.js';

//const validPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\/\.#$@%^&*\(\)_=\-\{\}\[\]+])(?!\s)[a-zA-z\d\/\.#$@%^&*\(\)\_\=\-{}\[\]+]{8,70}$/gm;

const UserSchema = new Schema({
    user:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },

    email:{
        type:String,
        unique:true,
        trim:true,
        required:true,
        lowercase:true,
        validate(value){
            if (!validator.isEmail(value)) {
                throw new Error('Incorrect Email');
            }
        }
    },

    pass:{
        type:String,
        required:true,
        minLength:[8, 'minimo 8 caracteres'],
        validate(value){
            if (!validator.isStrongPassword(value)) {
                throw new Error('el pass necesita una mayuscula, una minuscula, numeros y caracteres especiales(@#*)');
            }
        }
    },
    
    memberType:{
        type:String,
        default:'BASIC'
    },

    verified:{
        type:Boolean,
        default:false
    },

    code:String,

    avatar:{
        type:String,
        default:''
    },

    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]

}, {timestamps:true, versionKey:false})

// * virtual property
UserSchema.virtual('posts', {
    ref: 'Post',
    localField: '_id',
    foreignField:'owner'

})

// * get token after auth
UserSchema.methods.generateAuthToken = async function() {
    const token = jwt.sign({_id:this._id.toString()}, process.env.SECRETJWT || 'bootcampTalendig', {expiresIn:'24h'});

    this.tokens = this.tokens.concat({token});

    await this.save();

    return token;
}

// * auth
UserSchema.statics.findByCredentials = async (email, pass) => {
    const user = await User.findOne({email});
    if (!user) {
        return 'error';
    }
    const isMatch = await bcrypt.compare(pass, user.pass);

    if (!isMatch) {
        // throw new Error('Incorrect Email or password');
        return 'error';
    }

    return user
}

// * encrypt pass
UserSchema.pre('save', async function (next) { 
    if (this.isModified('pass')) {
        this.pass = await bcrypt.hash(this.pass, 8);
    }

    next();
})

// * before delete user
UserSchema.pre('remove', async function (next) { 
    await Post.deleteMany({owner:this._id})

    next();
})

UserSchema.plugin(mongoosePaginate);

const User = model('User', UserSchema);

export default User;