import { NextResponse } from "next/server";
import mongoose from 'mongoose';
import 'dotenv/config';
import { therapists, clients } from '../../Schemas/UserSchemas';
import { ObjectId } from "mongodb";


const calSchema = new mongoose.Schema({
    name: String,
    dates: Array,
});

const calenders = mongoose.models.calenders || mongoose.model("calenders", calSchema, "calendars");


export async function POST(request) {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        let x = await request.json();

        let user =  x.user;
        let date = x.date;

        

        let query = therapists.where({ Username : user });
        let findQuery = await query.findOne();

        let temp = findQuery.DatesAvailable;
        temp.push(date);

        findQuery.DatesAvailable = temp;
        await findQuery.save();

        return NextResponse.json({ "user": user, "date": date})
    } catch (error) {
        
    }
}