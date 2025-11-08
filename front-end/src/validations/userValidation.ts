import path from 'path';
import z from 'zod'

const passwordRegex =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
export const signupSchema=z.object({
    username:z.string(),
    email:z.string().toLowerCase().trim().includes("@"),
    password:z.string().min(8).regex(passwordRegex),
    confirmPaswword:z.string()
}).refine((data)=>{
    if(data.password ===data.confirmPaswword ){
        return {
            message:"password do not match",
            path:["confirmPassword"]
        }
    }
})

export const loginSchema=z.object({
    email:z.string().toLowerCase().toLowerCase().includes("@"),
    password:z.string().min(8,"Password must contain atleast 8 character")
})