import type {CookieOptions, Request,Response} from 'express'
import { User } from '../models/user.model.js'
import { serverResponse } from '../utils/ServerResponse.js'
import { sendEmail } from '../utils/SendEmail.js'
import { verificationEmailTemplate } from '../utils/VerficationEmailTemplate.js'
import { ServerErrors } from '../utils/serverErrors.js'

export interface Signup{
    username:string,
    email:string,
    password:string,
}

// generate token
async function generateToken(id:string){
   const getUser= await User.findOne({_id:id})
   const accessToken=getUser!.accessToken()
   const refreshToken=getUser!.refreshToken()
   return [accessToken ,refreshToken]
}
export async function localSignup(req:Request,res:Response){
         try {
            const {username,email,password}= req.body as Signup
            
            // checking if any field is empty
            if(!username || !email || !password){
               throw new Error('all field are requires')
            }
   
            // finding if user already Exist
            const existedUser = await User.findOne({email:email})
            if(existedUser){
                throw new Error('user alreday exist')
            }
             
            // generating verification code
            const verificationCode=Math.floor((Math.random()*9000) + 1000)
            console.log(`otp`,verificationCode)
            await sendEmail(email,verificationEmailTemplate(verificationCode.toString()),'Account Verifcation')
            
            // saving data to DataBase
           const newUser= await User.create({
                 username,
                 email,
                 password,
                 providerId:null,
                 provider:"local",
                 isVerified:false,
                 otp:verificationCode
 
             })
           
           return serverResponse(res,{
                success:true,
                statusCode:201,
                message:'user CreatedSuccess Fully',
                data:newUser.username
            })

         } catch (error) {
            if(error instanceof Error){
              return   serverResponse(res,{
                success:false,
                statusCode:400,
                message:error.message,
            })
            }
         }

}

export async function codeVerification(req:Request,res:Response){
    try {
        const username=req.params.username
        const {otp}=req.body

        // console.log(typeof(otp))
        // console.log('recieved code ',otp)
        
        if(!otp){
            throw new Error ('veriffication Code is requireds')
        }

        const verifyUser=await User.findOne({username})
        if(!verifyUser){
            throw new Error('user does not exist ')
        }

        if(verifyUser.otp !== otp){
            throw new Error("Invalid Code")
        }

       const updatedUser = await User.findOneAndUpdate(
        {username},
        {
            $set:{isVerified:true},
            $unset:{otp:""}
        },
        {new:true}
       ).select("-password")
       console.log(`updated user`,updatedUser)

       // sending Token after signup verification
         const [accessToken,refreshToken]=await generateToken(String(updatedUser?._id))
         if (!accessToken || !refreshToken) {
            throw new Error("Token generation failed");
          }

          // sending cookies and response
         const cookieOptions:CookieOptions={
            httpOnly:true,
            secure:true,
            sameSite:"strict"
         }
         
         res.cookie("accessToken",accessToken,cookieOptions)
         res.cookie("refreshToken",refreshToken,cookieOptions)
         serverResponse(res,{
                success:true,
                statusCode:200,
                message:'user verified Successfully',
                data:updatedUser
            })
    
    } catch (error) {
        if(error instanceof Error){
            serverResponse(res,{
                success:false,
                statusCode:400,
                message:error.message,
                error:error,
                
            })
        }
    }

}

export async function loginController(req:Request, res:Response){
    try {
        const {email,password}=req.body
        console.log('email',email)
        console.log('password ',password) 

        if(!email || !password){
            throw new ServerErrors('all field are required',400)
        }

        const existedUser=await User.findOne({email})
        if(!existedUser){
            throw new ServerErrors('User Not found',400)
        }

        const isPasswordCorrect=await existedUser.comparePassword(password)
        if(!isPasswordCorrect){
            throw new ServerErrors("Incorrect Password",400)
        }
        // checking if user ius verified or not

        // sending Token after login verification
         const [accessToken,refreshToken]=await generateToken(String(existedUser?._id))

         if (!accessToken || !refreshToken) {
            throw new ServerErrors("Token generation failed",501);
          }

          // sending cookies and response
         const cookieOptions:CookieOptions={
            httpOnly:true,
            secure:true,
            sameSite:"strict"
         }
         
         res.cookie("accessToken",accessToken,cookieOptions)
         res.cookie("refreshToken",refreshToken,cookieOptions)

        return  serverResponse(res,{
                success:true,
                statusCode:200,
                message:'Logged in successfuly',
                data:existedUser
            })
    } catch (error) {
        if(error instanceof Error){
        const statusCode = error instanceof ServerErrors ? error.statusCode : 500;
       return serverResponse(res,{
                success:false,
                statusCode:statusCode,
                error:error,
                message:error.message
            
            })
    }
}

}