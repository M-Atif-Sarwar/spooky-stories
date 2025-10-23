import type { IncomingMessage, ServerResponse } from "node:http";
import { parseBody } from "../utils/ParseBody.js";
import { getData } from "./GetData.js";
import {promises as fs} from "node:fs"
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { serverResponse } from "./ServerResponse.js";
export async function saveData(res:ServerResponse,dirname:string,parseData:Object){

    const newpath=path.join("data","data.json")
     try {
        const existingData=await getData(dirname)

         if(existingData){
           // Adding data to file
            existingData.push(parseData)
            console.log(`updated Data is `,existingData)
            await writeFile(
                newpath,
                JSON.stringify(existingData,null,3),
                "utf-8")

            //sending Response
            serverResponse(res,{
                    success:true,
                    statusCode:res.statusCode,
                    message:"Data Added successfuly",
                    data:existingData
                }
            )
         }
         
        
     } catch (error:any) {
         serverResponse(res,{
                    success:false,
                    statusCode:res.statusCode,
                    message:error.message,
                    
                }
            )
     }
    
           
}