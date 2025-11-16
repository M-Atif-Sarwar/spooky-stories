export class ServerErrors extends Error{
   statusCode:number
   success:boolean
   error?:any[]
   
    constructor(message:string,statusCode:number,error?:any[]){
    super(message)
    this.statusCode =statusCode
    this.success =false
    this.error=error
   }
}