"use client"
import { loginSchema } from "@/validations/userValidation";
import {z} from "zod"
import { useForm, Watch } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { FormFields } from '@/components/formInputField';
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export type LoginData=z.infer<typeof loginSchema>
interface LogedinUser{
  email: string;
  password: string;
}

export default function Login()  {
    // setting up useform hook
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,

    }=useForm<LoginData>({
        mode:"onChange",
        resolver:zodResolver(loginSchema)
    })

    const [displayError,setDisplayError]=useState<string |null >(null)
    const [isPending, startTransition] = useTransition()
    const router = useRouter();

    // enabling and isabling button in useform hook
    const watchAllFields = watch()
    const isDisabled = !watchAllFields.email || !watchAllFields.password;

   
    // add signup fuction
    const loginHandler=async(data:LoginData)=>{
      console.log(data)
     
      // sending and recivind data from api
      try {
         const response=await fetch('api/login',{
            method:'POST',
            credentials:'include',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(data)
        }) 

          const recievedData= await response.json()
          if(!response.ok){
             throw new Error(recievedData.message)
          }

         console.log(recievedData)
         router.push('/')

      } catch (error) {
         if(error instanceof Error){
          setDisplayError(error.message)
         }
      }
    }
  return (
    <>
       <div className="flex flex-col justify-center items-center min-h-screen gap-y-2 ">

       <h1 className="text-2xl text-blue-700 font-extrabold">Spooky Stories</h1>
       
       <form 
       onSubmit={handleSubmit(loginHandler)}
       >
        <h2 className="text-xl text-center mt=3 mb-3">Create an Account</h2>
        
        <FormFields
        label='Email'
        type='email'
        register={register}
        name='email'
        placeholder="abc@gmail.com"
        error={errors.email}
        ></FormFields>

        
        <FormFields
        label='Password'
        type='password'
        register={register}
        name='password'
        placeholder="Enter Password"
        error={errors.password}
        ></FormFields>
        
         {displayError && <p className="text-red-600">{displayError}</p>}

         <button  disabled={isDisabled}
            className={`bg-green-600 px-10 py-1.5 rounded-md block mx-auto mt-4 ${isDisabled ? 'bg-green-600/10' : 'bg-green-600'}`}>
            {isPending ? "Signing Up..." : "Sign Up"}
         </button>

          <div className="flex justify-center mt-2">
            <Link href="/signUp" className="text-xs text-green-400">
               dont have an account ?
            </Link>
         </div>
       </form>    

       </div>
    </>
  )
}