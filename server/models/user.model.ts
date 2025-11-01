import bcrypt from "bcryptjs";
import mongoose,{Schema,Document,Model} from "mongoose";
import jwt from 'jsonwebtoken'
import type { Secret, SignOptions, JwtPayload } from 'jsonwebtoken';
//enum for provider
type Provider = 'google' | 'facebook' | 'github' | 'local';

export interface user extends Document{
     username:string,
     email:string,
     password:string | null,
     providerId:string | null,
     provider:Provider,
     isVerified:boolean,
     otp?:string,
     image:string | null
}

// password regex for password like ABC#abc123
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const UserSchema=new Schema({
    username: { 
        type: String, 
        required: true 
    },
    email: {
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String,
        required:true,
        minLength:[8,'A password be altleast 8 character long'],
        match:[passwordRegex,'Password must contain uppercase, lowercase, number, and special character']

    },
    providerId: { 
        type: String, 
        default: null 
    },
    provider: { 
    type: String, 
    enum: ['google','facebook','local'], 
    required: true 
  },
  isVerified: { 
    type: Boolean, 
    default: false 
},
  OTP: { 
    type: String, 
    default: null 
},
    OTPExpires: { type: Date, default: null },    
})

// incrypting password middleware
UserSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        return
    }
    this.password =await bcrypt.hash(this.password,32)
    next()
})

// comparing our password with  the hasted password
UserSchema.methods.comparePassword=async function(password:string):Promise<boolean>{
    return await bcrypt.compare(password,this.password)    
}

// Adding method to create access token
UserSchema.methods.accessToken = async function():Promise<string> {
  const payload = {
     _id: this._id, 
     email: this.email 
    };
  const secret = process.env.ACCESS_TOKEN_SECRET!;
  const expiresIn: SignOptions["expiresIn"] = (process.env.ACCESS_TOKEN_EXPIRY || "5m") as
    SignOptions["expiresIn"];

  return  jwt.sign(payload, secret, { expiresIn });
};

// Access token 
UserSchema.methods.accessToken =function():string {
  const payload = {
     _id: this._id, 
     email: this.email 
    };
  const secret = process.env.ACCESS_TOKEN_SECRET!;
  const expiresIn: SignOptions["expiresIn"] = (process.env.ACCESS_TOKEN_EXPIRY || "5m") as
    SignOptions["expiresIn"];

  return  jwt.sign(payload, secret, { expiresIn });
};

// Access token
UserSchema.methods.accessToken = function():string{
  const payload = {
     _id: this._id, 
     email: this.email 
    };
  const secret = process.env.REFRESH_TOKEN_SECRET!;
  const expiresIn: SignOptions["expiresIn"] = (process.env.REFRESH_TOKEN_EXPIRY || "5m") as
    SignOptions["expiresIn"];

  return  jwt.sign(payload, secret, { expiresIn });
};

export const User:Model<user>=mongoose.models.User || mongoose.model<user>("User", UserSchema);