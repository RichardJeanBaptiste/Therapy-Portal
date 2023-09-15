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
        let x =  await request.json();

        console.log(x.username);
        console.log(x.password);

        let newUser = new User({ username: x.username, password: x.password});
        await newUser.save();

        mongoose.disconnect();
        return NextResponse.json({ msg: 'Account Created'}, {status: 200})
    } catch (error) {
        console.log(error);
        return NextResponse.json({msg: 'Internal Server Error'}, {status: 500})
    }
    
}