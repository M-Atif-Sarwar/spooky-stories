import http, { IncomingMessage, ServerResponse } from "node:http"
import dotenv from "dotenv";
import { serverResponse } from "./utils/ServerResponse.js";
import { getData } from "./utils/GetData.js";
import { getRequest } from "./handlers/getRoute.js";
dotenv.config();

const __dirName=import.meta.dirname
const port=process.env.PORT || 3000

const server =http.createServer(async (req:IncomingMessage,res:ServerResponse)=>{
     if(req.url?.startsWith("/api") && req.method === "GET"){
       await getRequest(res,__dirName)
     }else{
        return 
     }
})

server.listen(port,()=>{
    console.log(`server  on port ${port}`)
})