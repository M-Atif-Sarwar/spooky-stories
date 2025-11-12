"use client"
import {z} from "zod"
import { signupSchema } from '@/validations/userValidation'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { FormFields } from '@/components/formInputField';
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthPostAction from "@/utils/signUpAction";

//defining types

export type SignupData=z.infer<typeof signupSchema>
interface SignupUpdated{
  username: string;
  email: string;
  password: string;
}

export default function Signup()  {
    const {
        register,
        handleSubmit,
        formState: { errors },

    }=useForm<SignupData>({
        resolver:zodResolver(signupSchema)
    })

    const [displayError,setDisplayError]=useState<string |null >(null)
    const [isPending, startTransition] = useTransition()
    const router = useRouter();


   
    // add signup fuction
    const signUPHandler=async(data:SignupData)=>{
      const url=`${process.env.NEXT_PUBLIC_BASE_URL}/auth/signup`
      console.log(data)
      const dataTosend={
         username:data.username,
         email:data.email,
         password:data.password
      }
      try {
         const recievedData= await AuthPostAction<SignupUpdated>(dataTosend,url,'POST')
         console.log(recievedData)
         router.push(`/verifyAccount/${recievedData.data}`)
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
       onSubmit={handleSubmit(signUPHandler)}
       >
        <h2 className="text-xl text-center mt=3 mb-3">Create an Account</h2>
        <FormFields
        label='User Name'
        type='text'
        register={register}
        name='username'
        placeholder="Enter UserName"
        error={errors.username}
        ></FormFields>

        
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
        
        <FormFields
        label='ConfirmPassword'
        type='password'
        register={register}
        name='confirmPassword'
        placeholder="Enter Password"
        error={errors.confirmPassword}
        ></FormFields>
         {displayError && <p className="text-red-600">{displayError}</p>}

         <button  disabled={isPending}
            className="bg-green-600 px-10 py-1.5 rounded-md block mx-auto mt-2"
         >
            {isPending ? "Signing Up..." : "Sign Up"}
         </button>

          <div className="flex justify-center mt-2">
            <Link href="/login" className="text-xs text-green-400">
               already have an account ?
            </Link>
         </div>
       </form>    

       </div>
    </>
  )
}


