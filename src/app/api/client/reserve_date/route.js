import { NextResponse } from "next/server";
import mongoose from 'mongoose';
import 'dotenv/config';
import { clients } from '../../../Schemas/UserSchemas';

export async function POST(request) {

    try {

        await mongoose.connect(process.env.MONGO_URI);
        let data = await request.json();

        let queryUsername = data.username;
        let queryDate = data.reserveDate;
        let queryTherapist = data.therapistName;

        let query = clients.where({ Username: queryUsername});
        let userQuery = await query.findOne();

        if(userQuery === null){
            mongoose.disconnect();
            return NextResponse.json({ "msg": "Client not found"});
        } else {

            // add to Therapists
            if(userQuery.Therapists.includes(queryTherapist) === false){
                userQuery.Therapists.push(queryTherapist);
            } 

            // add to scheduled dates
            userQuery.DatesReserved.push(queryDate);
            await userQuery.save();

            mongoose.disconnect();
            return NextResponse.json({"msg": `Date: ${queryDate} Reserved`});

        }
        
    } catch (error) {
        return NextResponse.json({ "msg" : error });
    }
}