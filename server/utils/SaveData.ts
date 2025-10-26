import { getData } from "./GetData.js";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import type { Response } from "express";
import { serverResponse } from "./ServerResponse.js";

export async function saveData(res:Response,dirname:string,parseData:Object){

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
                    statusCode:200,
                    message:"Data Added successfuly",
                    data:existingData
                }
            )
         }
         
        
     } catch (error:any) {
        res.statusCode=400
         serverResponse(res,{
                    success:false,
                    statusCode:400,
                    message:error.message,
                    
                }
            )
     }
    
           
}