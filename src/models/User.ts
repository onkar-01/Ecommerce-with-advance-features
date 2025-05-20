import mongoose, { model, models, Schema }  from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser {
    name:string,
    email:string,
    password:string,
    role:'User'|'Admin',
    _id?: mongoose.Types.ObjectId;
    createdAt?: Date,
    updatedAt?: Date,
    mobile?:string,
    address?:string,
    isVerified:boolean,
}

const userSchema = new Schema<IUser>({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String, // this is the Standerd of mongoose in which we have to user String cunstroctor
        required: true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true,
        default:'User'
    },
    mobile:{
        type:String,
        unique:true
    },
    address:{
        type:String,
    },
    isVerified:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
});


userSchema.pre("save", async function(next) {
    if(!this.isModified('password')){
        this.password = await bcrypt.hash(this.password,10); // here we ecrypting the password using Hash method of bcrypt
    }
    next();
});



const User = models?.User || model<IUser>("User", userSchema);

export default User