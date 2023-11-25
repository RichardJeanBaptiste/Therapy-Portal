import { NextResponse } from "next/server";
import mongoose from 'mongoose';
import 'dotenv/config';
import { therapists } from '../../../Schemas/UserSchemas';
import dayjs from 'dayjs';

async function make_available(userQuery, day) {
    if(userQuery.DatesAvailable.includes(day)){
        // do nothing
    } else {
        userQuery.DatesAvailable.push(day);
    }
}

export async function POST(request){
    try {
        await mongoose.connect(process.env.MONGO_URI);
        let data = await request.json();

        const queryUsername = data.Username;
        const queryBeginDate = dayjs(data.beginDate);
        const queryEndDate = dayjs(data.endDate);
        const range = queryEndDate.diff(queryBeginDate, 'day');


        let query = therapists.where({ Username: queryUsername});
        let userQuery = await query.findOne();

        for(let i = 0; i <= range; i++) {
            make_available(userQuery, queryBeginDate.add(i, 'day').format('ddd, DD MMM YYYY'));
        }

        await userQuery.save();
        mongoose.disconnect();
        return NextResponse.json({ "msg" : "Dates made available"});

       

    } catch (error) {
        return NextResponse.json({ "msg": "Something wrong happend on our end :("});
    }
}