"use server"

export default async function AuthPostAction<T>(
   data:T,
   transferMethod:'POST' | 'PUT',
   ){
      

   try {
      const url = `${process.env.API_URL}/auth/signup`
      const response=await fetch(url,{
        method:transferMethod,
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
      })

      const result= await response.json()
       console.log(response)

       if(!response.ok){
         console.error("Signup failed:", response.status, result)
         return { success: false, error: result?.message || "Signup failed", data: null }
       }
     
       return { success: true, error: null, data: result }                        
      
      
   } catch (error: any) {
      console.error("Error during signup:", error)
       return { success: false, error: "Something went wrong. Please try again.", data: null }
   }
} 