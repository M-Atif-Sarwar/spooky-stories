"use server"
import { SignupData } from "@/app/(auth)/signUp/page";

export default async function AuthPostAction<T>(
   data:T,
   url:string,
   transferMethod:'POST' | 'PUT',
   ){
      "use server"
   
   try {
      const response=await fetch(url,{
        method:transferMethod,
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
      })

       if(!response.ok){
        throw new Error('Signup failed')
       }
      console.log(response)
      const result= await response.json()
      console.log('data',result)
      
      return result
      
   } catch (error) {
    if(error instanceof Error)
       throw new Error(error.message)
   }
} 