import mongoose, { model,  Schema, trusted } from "mongoose";
import bcrypt from "bcryptjs"

const userSchema=new Schema({

   name:{
    type:String,
    required:true,
    unique:true,
   },
   username:{
    type:String,
    required:true,
    unique:true
   },
   password:{
    type:String,
    required:true,
    select:false
   },
   avatar:{
    public_id:{
        type:String,
        required:true,
    },
    url:{
        type:String,
        required:true,
    },


   }



},{
    timestamps:true
})

userSchema.pre("save",async function(){

    if(!this.isModified("password")) return

    this.password=await bcrypt.hash(this.password,10)

})

export const User=mongoose.models.User|| model("User",userSchema)