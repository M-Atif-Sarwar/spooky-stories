import { getData } from "../utils/GetData.js";
import type {Response ,Request} from "express";
import { serverResponse } from "../utils/ServerResponse.js";
import { __dirName } from "../server.js";
import {z} from 'zod'
import sanitizeHtml from 'sanitize-html';
import { saveData } from "../utils/SaveData.js";

export const IncommingData=z.object({
  uuid: z.string(),
  title: z.string(),
  location: z.string(),
  date: z.string(),
  content: z.string(),
});

export type incommingData= z.infer<typeof IncommingData>
export async function getRequest(req:Request,res:Response){
     try {
          const storiesdata=await getData(__dirName)
          serverResponse(res,{success:true,statusCode:res.statusCode,message:"data send Sucessfully",data:storiesdata})
     } catch (error:any) {
             serverResponse(res,{success:false,statusCode:res.statusCode,message:error.message,})
          throw new Error(error.message)
     }

}

export async function postRequest(req:Request,res:Response){
           try {
            const data:incommingData =req.body
            if(!data){
                throw new Error('Data not found')
            }

             if(data){
                //checking for scripting attack
                let santize: Record<string, any>={}
                for (const [key,value] of Object.entries(data)){
                    if(typeof value === 'string'){
                    santize[key]=sanitizeHtml(value,{allowedTags:["b"],allowedAttributes:{}})
                    }else{
                        throw new Error('unsafe tags are not allowed')

                    }
                }

                await saveData(res,__dirName,santize)

             }
            
           } catch (error:any) {

            return serverResponse(res,
                {
                    success:false,
                    statusCode:400,
                    message:error.message,       
                }
            )
           }
}