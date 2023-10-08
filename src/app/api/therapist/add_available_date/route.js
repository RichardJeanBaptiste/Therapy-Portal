import { NextResponse } from "next/server";
import mongoose from 'mongoose';
import 'dotenv/config';
import { therapists } from '../../../Schemas/UserSchemas';

export async function POST(request){
    try {
        await mongoose.connect(process.env.MONGO_URI);
        let data = await request.json();

        let queryUsername = data.username;
        let queryDate = data.newDate;

        let query = therapists.where({ Username: queryUsername});
        let userQuery = await query.findOne();

        if(userQuery.DatesAvailable.includes(queryDate)){
            mongoose.disconnect();
            return NextResponse.json({ "msg": "Date already available"});
        } else {
            userQuery.DatesAvailable.push(queryDate);
            await userQuery.save();
            mongoose.disconnect();
            return NextResponse.json({ "msg" : "Date made available"});
        }

        

       

    } catch (error) {
        
    }
}