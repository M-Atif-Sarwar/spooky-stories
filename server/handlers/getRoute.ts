import http, { IncomingMessage, ServerResponse } from "node:http"
import { serverResponse } from "../utils/ServerResponse.js";
import { getData } from "../utils/GetData.js";

export async function getRequest(res:ServerResponse,dirname:string){
     try {
          const storiesdata=await getData(dirname)
          serverResponse(res,{success:true,statusCode:res.statusCode,message:"data send Sucessfully",data:storiesdata})
     } catch (error:any) {
             serverResponse(res,{success:false,statusCode:res.statusCode,message:error.message,})
          throw new Error(error.message)
     }

}