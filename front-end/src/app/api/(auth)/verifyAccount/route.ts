import { NextRequest, NextResponse } from "next/server";
export async function POST(req:NextRequest){
    
    const recievedData =await req.json()
    if(!recievedData){
      throw new Error('All fiels are required')
    }
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify/${recievedData.username}`

    // sending request to custom backen end and setting cookies
    try {
        const response=await fetch(url,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(recievedData),
        credentials:"include",
        })
        
        const result= await response.json()

        if(!response.ok){
         console.log('failed response',result)
         throw new Error(result.messgae || 'User Verfication faile')

       }

       console.log('succeful result',result)

       const res = NextResponse.json({ success: true,
        message:'Account verify successfuly', 
        data: result.data }
        ,{status:200});

       // getting cookies from node js bckend and forword it front end nestjs

       const recievedCookies=response.headers.get("Set-Cookie")
       if(recievedCookies){
        res.headers.append('Set-Cookie',recievedCookies)
       }

       return res
    } catch (error) {
      if(error instanceof Error){
       return NextResponse.json({sucess:false,
            error:error,
            errorMessage:error.message,
            message:'Fail to verify Account'},
            {status:500}
        )
      }        
    } 

}