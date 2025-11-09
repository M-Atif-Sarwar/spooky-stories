import z from 'zod'

const passwordRegex =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
const passmessage="Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character "

export const signupSchema=z.object({
    username:z.string(),
    email:z.string().toLowerCase().trim().includes("@"),
    password:z.string().min(8,'Password must 8 character long').regex(passwordRegex,passmessage),
    confirmPassword:z.string()
}).refine((data)=>data.password === data.confirmPassword ,{
            message:"password do not match",
            path:["confirmPassword"],
        })
        
export const loginSchema=z.object({
    email:z.string().toLowerCase().toLowerCase().includes("@"),
    password:z.string().min(8,"Password must contain atleast 8 character")
})