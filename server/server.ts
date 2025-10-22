import http, { IncomingMessage, ServerResponse } from "node:http"
import dotenv from "dotenv";
import { serverResponse } from "./utils/ServerResponse.js";
dotenv.config();

const __dirName=import.meta.dirname
const port=process.env.PORT || 3000

const server =http.createServer((req:IncomingMessage,res:ServerResponse)=>{
      res.statusCode = 200;
     serverResponse(res,{success:true,statusCode:res.statusCode,message:"data send Sucessfully"})
})

server.listen(port,()=>{
    console.log(`server  on port ${port}`)
})