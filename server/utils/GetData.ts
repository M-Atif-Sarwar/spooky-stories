import { promises as fs } from "node:fs";
import path from "node:path"

export async function getData(dirName:string){
  const dataPath=path.join(dirName,"data","data.json")
  const storiesData= await fs.readFile(dataPath,"utf-8")
  return JSON.parse(storiesData) || []
} 