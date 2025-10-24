import type { IncomingMessage, ServerResponse } from "node:http";
import { parseBody } from "../utils/ParseBody.js";
import { saveData } from "../utils/SaveData.js";
import sanitizeHtml from 'sanitize-html';
import sanitize from "sanitize-html";
import { serverResponse } from "../utils/ServerResponse.js";
export async function postRequest(req:IncomingMessage,res:ServerResponse,dirname:string,){
           try {
            const parseData=await parseBody(req)
             if(parseData){
                //checking for scripting attack
                let santize: Record<string, any>={}
                for (const [key,value] of Object.entries(parseData)){
                    if(typeof value === 'string'){
                    santize[key]=sanitizeHtml(value,{allowedTags:["b"],allowedAttributes:{}})
                    }else{
                        throw new Error('unsafe tags are not allowed')

                    }
                }

                await saveData(res,dirname,santize)

             }
            
           } catch (error:any) {
            res.statusCode=400
            serverResponse(res,
                {
                    success:false,
                    statusCode:400,
                    message:error.message,       
                }
            )
           }
}