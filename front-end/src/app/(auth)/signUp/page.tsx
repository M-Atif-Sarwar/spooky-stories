"use client"
import {z} from "zod"
import { signupSchema } from '@/validations/userValidation'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { FormFields } from '@/components/formInputField';
import AddUser from "@/utils/signUpAction";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
export type SignupData=z.infer<typeof signupSchema>

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
      console.log(data)
      try {
         const recievedData= await AddUser(data)
         console.log(recievedData)
         const username=recievedData.username
         router.push(`/verifyAccount/${username}`)
      } catch (error) {
         if(error instanceof Error){
          setDisplayError(error.message)
         }
      }
    }
  return (
    <>
       <form onSubmit={handleSubmit(signUPHandler)}>
        
        <FormFields
        label='Useranme'
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

        <br />
        
        <FormFields
        label='ConfirmPassword'
        type='password'
        register={register}
        name='confirmPassword'
        placeholder="Enter Password"
        error={errors.confirmPassword}
        ></FormFields>
         {displayError && <p className="text-red-600">{displayError}</p>}

         <button  disabled={isPending}>
            {isPending ? "Signing up..." : "Signup"}
         </button>
       </form>
    </>
  )
}


