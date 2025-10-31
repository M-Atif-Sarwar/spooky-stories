import mongoose,{Schema,Document} from "mongoose";


interface IStory extends Document {
  title: string,
  location: string,
  dateTime: string,
  content: string,
  user: mongoose.Types.ObjectId;
}

const StorySchema = new Schema<IStory>(
   {
    title:{
        type:String,
        required:true,    
    },
    location:{
        type:String,
        required:true,
    },
    dateTime:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true,
        trim: true,
        maxlength: 20000,
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }

   },
   {timestamps:true}
)

export const Story=mongoose.models.Story || mongoose.model<IStory>("Story", StorySchema);