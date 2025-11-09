"use server"
import { SignupData } from "@/app/(auth)/signUp/page";

export default async function AddUser(data:SignupData){
      "use server"
    const userData={
        username:data.username,
        email:data.email,
        password:data.password
    }
   try {
      const response=await fetch('/auth/signup',{
        method:'POST',
        headers:{"content-Type":"application/json"},
        body:JSON.stringify(userData)
      })

       if(!response.ok){
        throw new Error('Signup failed')
       }
      console.log(response)
      const data= await response.json()
      console.log('data',data)

      return data
   } catch (error) {
    if(error instanceof Error)
       throw new Error(error.message)
   }
} 