import { NextResponse } from "next/server";
import mongoose from 'mongoose';
import 'dotenv/config';
import {  clients } from '../../../Schemas/UserSchemas';




export async function GET() {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        let data = await clients.find({});

        let res = [];

        data.map((x) => {
            res.push({ "username": x.Username, "availablity": x.DatesReserved, "info": x.Info})
        });

        return NextResponse.json(res)
    } catch (error) {
        return NextResponse.json({"msg": error});        
    }
}