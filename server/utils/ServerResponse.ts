import type { ServerResponse } from "node:http"
import { getData } from "./GetData.js"

export type ResponseParameter={
    success:boolean,
    statusCode:Number
    message:string,
    data?:any
}
export function serverResponse(res:ServerResponse,serverResponse:ResponseParameter){

    res.setHeader("content-Type","application/json")
    res.end(JSON.stringify(
        serverResponse
    ))

}