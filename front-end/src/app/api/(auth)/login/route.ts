
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    const {email,password}=await req.json()
    console.log(`email " ${email}, password ${password}`)
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`
    console.log(url)

    if(!email || !password){
     return NextResponse.json({success:false,message:"all field are required"},{status:400})
    }

    //sending request to cutoms nodejs backend
    try {
        const response=await fetch(url,{
            method:'POST',
            credentials:'include',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({email,password})
        })

        const data= await response.json()
        if(!response.ok){
             return  NextResponse.json({success:false,message:data.message},{status:response.status})
        }

        // setting and adding cookies
        const cookiHeader=response.headers.get('Set-Cookie')
        if(!cookiHeader){
            return  NextResponse.json({success:false,message:'no cookies found from server'},{status:500})
        }

         const res= NextResponse.json({
                success: true,
                message: "Login successful",
                data: data.data,
            },{status:200});

        res.headers.append('Set-Cookie',cookiHeader)

        return  res
        
    } catch (error) {
        if(error instanceof Error){
            // console.log(error)
             return  NextResponse.json({success:false,message:error.message,},{status:500})
        
        }
    }
} 