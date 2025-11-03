import dotenv from "dotenv";
import express from 'express'
import type{ Request, Response } from 'express'
import cookieParser from "cookie-parser"
dotenv.config();
import cors from 'cors'
import { dbConnection } from "./dbConnection/dbConnection.js";
import { authRouter } from "./handlers/authRouter.route.js";
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

// routes 
app.use('api/auth',authRouter)


try {
  await dbConnection()
  app.listen(port,()=>{
      console.log(`server  on port ${port}`)
  })
} catch (error) {
  if (error instanceof Error) {
    console.error("Failed to connect to DB:", error.message);
  }
  process.exit(1)
}