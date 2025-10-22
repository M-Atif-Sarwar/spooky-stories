import http, { IncomingMessage, ServerResponse } from "node:http"
import dotenv from "dotenv";
dotenv.config();

console.log(import.meta)

const port=process.env.PORT || 3000
const server =http.createServer((req:IncomingMessage,res:ServerResponse)=>{
      console.log("➡️ Received request:", req.method, req.url);
      res.statusCode = 200;
   
     res.setHeader("Content-Type", "text/plain");
     res.end('Responsde test')
})

server.listen(port,()=>{
    console.log(`server  on port ${port}`)
})