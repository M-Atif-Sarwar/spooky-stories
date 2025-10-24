import type { IncomingMessage, ServerResponse } from "node:http";
import { z } from "zod";

export const IncommingData=z.object({
  uuid: z.string(),
  title: z.string(),
  location: z.string(),
  date: z.string(),
  content: z.string(),
});

export type IncommingData = z.infer<typeof IncommingData>;

export async function parseBody(req:IncomingMessage){
        let body=''
        for await (const chunk of req){
            body += chunk
        }
        try {
            const parseBody=(JSON.parse(body) as IncommingData)
            return IncommingData.parse(parseBody);
        } catch (error:any) {
            throw new Error(error.message)
        }
}