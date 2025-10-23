import type { IncomingMessage, ServerResponse } from "node:http";

export async function parseBody(req:IncomingMessage,res:ServerResponse){
        let body=''
        for await (const chunk of req){
            body += chunk
        }
        try {
            const parseBody=JSON.parse(body)
            return parseBody
        } catch (error:any) {
            throw new Error(error.message)
        }
}