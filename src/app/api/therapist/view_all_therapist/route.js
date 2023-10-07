import { NextResponse } from "next/server";
import mongoose from 'mongoose';
import 'dotenv/config';
import { therapists } from '../../../Schemas/UserSchemas';

export async function GET(){
    try {
        await mongoose.connect(process.env.MONGO_URI);

        let data = await therapists.find({});

        let res = [];

        data.map((x) => {
            res.push({ "username": x.Username, "availablity": x.DatesAvailable, "info": x.Info})
        })

        return NextResponse.json(res);
    } catch (error) {
        return NextResponse.json({ "msg": "Server Error"}, { status: 500});   
    }
}