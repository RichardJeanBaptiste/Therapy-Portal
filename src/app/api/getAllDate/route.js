import { NextResponse } from "next/server";
import mongoose from 'mongoose';
import 'dotenv/config';


const calSchema = new mongoose.Schema({
    name: String,
    dates: Array,
});

const calenders = mongoose.models.calenders || mongoose.model("calenders", calSchema, "calendars");


export async function GET(request) {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        let x = await calenders.find({});

        return NextResponse.json({x})
    } catch (error) {
        
    }
}