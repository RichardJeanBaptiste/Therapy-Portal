import { NextResponse } from "next/server";
import mongoose from 'mongoose';
import 'dotenv/config';
import { therapists, calenders } from '../../../Schemas/UserSchemas';

export async function POST(request) {
    try {
        /**
         *  find available dates
         *  delete from available dates
         *  add to reserved dates
         */

        await mongoose.connect(process.env.MONGO_URI);
        let data = await request.json();

        let queryUsername = data.username;
        let queryDate = data.reserveDate;

        let query = therapists.where({ Username: queryUsername});
        let userQuery = await query.findOne();

        if(userQuery === null){
            mongoose.disconnect();
            return NextResponse.json({ "msg": "Therapist not found"})
        } else {
            
            // remove date from dates available
            let res = userQuery.DatesAvailable;
            res.splice(res.indexOf(queryDate), 1);
            userQuery.DatesAvailable = res;

            // add to scheduled dates
            userQuery.DatesScheduled.push(queryDate);

            await userQuery.save()

            mongoose.disconnect();
            return NextResponse.json({"msg": `Date: ${queryDate} Reserved`});
        }
    } catch (error) {
        return NextResponse.json({"msg": "Server Error"}, {status: 500});
    }
}