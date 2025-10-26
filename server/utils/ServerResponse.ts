import type { Response } from "express"
import { getData } from "./GetData.js"

export type ResponseParameter={
    success:boolean,
    statusCode:number,
    message:string,
    error?:string | Error,
    data?:any
}
export function serverResponse(res:Response,serverResponse:ResponseParameter){

    res.setHeader("content-Type","application/json")
    res.status(serverResponse.statusCode).json(
     serverResponse    
    )

}