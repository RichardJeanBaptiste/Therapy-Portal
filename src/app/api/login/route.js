import { NextResponse } from "next/server";
import mongoose from 'mongoose';
import 'dotenv/config';

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
})

//userSchema.pre - check if username exists 

const User = mongoose.models.User || mongoose.model("User", userSchema);

export async function POST(request) {

    try {

        await mongoose.connect(process.env.MONGO_URI);

        let data = await request.json();

        let queryUsername = data.username;
        let queryPassword = data.password;

        let query = User.where({ username: queryUsername});
        let findUser = await query.findOne();

        if(findUser === null){

            mongoose.disconnect();
            return NextResponse.json({ msg: 'User not found'}, {status: 404})

        } else {

            if(findUser.password !== queryPassword){

                mongoose.disconnect();
                return NextResponse.json({ msg: 'User not found'}, {status: 404})
                
            } else {

                let res = [ findUser._id, findUser.username];
                mongoose.disconnect();
                return NextResponse.json({ msg: res}, {status: 200})
            }   

        } 
                
    } catch (error) {
        console.log(error);
    }
    
}
