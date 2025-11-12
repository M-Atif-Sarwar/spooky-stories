'use client'
import z, { ZodError } from "zod"
import { verifyUserSchema } from "@/validations/userValidation"
import AuthPostAction from "@/utils/signUpAction"
import { useState } from "react"
import { useParams } from "next/navigation"
import { useRouter } from "next/navigation"

export type Verify=z.infer<typeof verifyUserSchema>
export default function VerifyAccount() {
    
    // getting prams
    const params=useParams()
    const username= decodeURIComponent(params?.username as string);
    
    const [otp,setOtp]=useState('')
    const router=useRouter()
    const [validationError,setValidationError]=useState<null | string>(null)

     const verifyHandler=async()=>{
        const url=`${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify/${username}`
        const data:Verify={
            otp,
            username,
        }
        try {
            const validatedData=verifyUserSchema.parse(data)
            const result=await AuthPostAction<Verify>(validatedData,url,'POST')
            console.log(result)
            router.push('/')
        } catch (error) {
            if(error instanceof ZodError){
                console.log(error.message)
                setValidationError(error.message)
            }else if(error instanceof Error){
                console.log(error.message)
            }
        }
     }
    return <>
       <div className="flex flex-col gap-y-5 justify-center items-center min-h-screen">
        <h1 className="text-xl font-extralight text-blue-600 text-center "> Verfy Your Account {username}</h1>
        <div className="flex flex-col gap-y-5">
            <h3 className="text-sm text-amber-200">A verification code has been sent to your email</h3>
            <p className="text-sm text-amber-200">Enter your code below to verify your Account </p>
            <input 
            type="text"
            maxLength={4}
            className="w-44 rounded-md p-1.5 border border-gray-500/20"
            value={otp}
            onChange={(e)=>setOtp(e.target.value)}
            />
            {validationError && <span>{validationError}</span>}
            <button
            className="bg-green-600 px-5 py-1.5 rounded-md w-44 "
            onClick={verifyHandler}
            >Verify </button>
        </div>
       </div>
    
    </>
}