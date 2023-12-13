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
            
            return NextResponse.json({ "msg": "Therapist not found"})
        } else {
            
            let res = { "username" : userQuery.Username, "clients" : userQuery.Clients, "scheduled" : userQuery.DatesScheduled, "available": userQuery.DatesAvailable, "info": userQuery.Info};
            return NextResponse.json(res);
        }

    } catch(error) {
        return NextResponse.json({"msg": "Server Error"}, {status: 500});
    }
}