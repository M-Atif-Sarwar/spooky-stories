'use client'
import z, { ZodError } from "zod"
import { verifyUserSchema } from "@/validations/userValidation"
import { useState } from "react"
import { useParams } from "next/navigation"
import { useRouter } from "next/navigation"

export type Verify=z.infer<typeof verifyUserSchema>
export default function VerifyAccount() {
    
    // getting prams
    const params=useParams()
    const username= decodeURIComponent(params?.username as string);
    
    const [otp,setOtp]=useState('')
    const [validationError,setValidationError]=useState<null | string>(null)
    const router=useRouter()
    const [isdisabled,setISDiable]=useState(true)
     const verifyHandler=async()=>{
        const data:Verify={
            otp,
            username,
        }
        try {
            const response=await fetch('/api/verifyAccount',{
            method:'POST',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(data)
            })

            const result= await response.json()
            if(!response.ok){
             throw new Error(result.message || 'User verification failed')
       }
          console.log('data',result)          
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
            className="w-44 rounded-md p-1.5 border border-gray-500/20 mx-auto"
            value={otp}
            onChange={(e)=>setOtp(e.target.value)}
            />
            {validationError && <span>{validationError}</span>}
            
            <button
            className={`px-5 py-1.5 rounded-md w-44 mx-auto ${otp ? 'bg-green-600' : 'bg-green-600/10'}`}
            onClick={verifyHandler}
            disabled={!otp}
            >Verify </button>
        </div>
       </div>
    
    </>
}