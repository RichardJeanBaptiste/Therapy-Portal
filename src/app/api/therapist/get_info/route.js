import { NextResponse } from "next/server";
import mongoose from 'mongoose';
import 'dotenv/config';
import { therapists } from '../../../Schemas/UserSchemas';


export async function POST(request){

    try {
        
        await mongoose.connect(process.env.MONGO_URI);
        let data = await request.json();

        let queryUsername = data.username;

        let query = therapists.where({ Username: queryUsername});
        let userQuery = await query.findOne();

        if(userQuery === null){
            mongoose.disconnect();
            return NextResponse.json({ "msg": "Therapist not found"})
        } else {
            mongoose.disconnect();
            return NextResponse.json(userQuery.Info);
        }
    } catch (error) {

        return NextResponse.json({"msg": "Server Error"}, {status: 500});
        
    }
}