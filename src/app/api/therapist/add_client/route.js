import { NextResponse } from "next/server";
import mongoose from 'mongoose';
import 'dotenv/config';
import { therapists } from '../../../Schemas/UserSchemas';

export async function POST(request) {
    
    try {
        await mongoose.connect(process.env.MONGO_URI);
        let data = await request.json();

        let queryTherapist = data.therapist;
        let clientUsername = data.client;

        let query = therapists.where({ Username: queryTherapist});
        let userQuery = await query.findOne();

        userQuery.Clients.push(clientUsername);
        await userQuery.save();

        return NextResponse.json({ "msg": "Client Added"});
    } catch (error) {
        return NextResponse.json({"msg": "Server Error"});
    }
}