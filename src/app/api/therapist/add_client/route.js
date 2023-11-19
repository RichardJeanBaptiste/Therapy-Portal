import { NextResponse } from "next/server";
import mongoose from 'mongoose';
import 'dotenv/config';
import { therapists, clients } from '../../../Schemas/UserSchemas';

export async function POST(request) {

    try {

        await mongoose.connect(process.env.MONGO_URI);
        let data = await request.json();

        let queryDate = data.newDate;
        let queryTherapist = data.therapist;
        let queryClient = data.client;

        let query = therapists.where({ Username: queryTherapist});
        let userQuery = await query.findOne();

       
        

        if(userQuery === null){
            mongoose.disconnect();
            return NextResponse.json({ "msg": "Therapist not found"});
        } else {

            // Add to Clients
            if(userQuery.Clients.includes(queryClient) === false){
                userQuery.Clients.push(queryClient);
            } 

            // add to scheduled dates
            // Check If Date Already Scheduled
            userQuery.DatesScheduled.push(queryDate);
            await userQuery.save();

            mongoose.disconnect();
            return NextResponse.json({"msg": `Date: ${queryDate} Reserved`});

        }
        
    } catch (error) {
        return NextResponse.json({ "msg" : error });
    }
}