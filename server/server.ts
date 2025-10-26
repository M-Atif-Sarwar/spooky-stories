import dotenv from "dotenv";
import express from 'express'
import type{ Request, Response } from 'express'
import cookieParser from "cookie-parser"
dotenv.config();
import cors from 'cors'
export const __dirName=import.meta.dirname
const port=process.env.PORT || 3000

const app=express()

// default middle wares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(
  cors({
    origin: "*",
    credentials: true, 
  })
);



app.listen(port,()=>{
    console.log(`server  on port ${port}`)
})