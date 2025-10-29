import mongoose from 'mongoose'

export async function dbConnection(){
    try {
        const dbResponse= await mongoose.connect(`${process.env.MONGODB_URL}/${process.env.DB_USERNAME}`)
        if(dbResponse.connection.readyState){
            console.log('database connected Successfully',)
        }
    } catch (error) {
        if(error instanceof Error){
          console.log(`failed to connect to db ${error.message}`)
          throw new Error (error.message)
        }
    }
}