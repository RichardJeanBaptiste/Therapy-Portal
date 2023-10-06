import { NextResponse } from "next/server";
import mongoose from 'mongoose';
import 'dotenv/config';
import { therapists, clients, calenders } from '../../../Schemas/UserSchemas';

export async function POST(request) {

    try {

        await mongoose.connect(process.env.MONGO_URI);
        let data = await request.json();
        
    } catch (error) {
        
    }
}