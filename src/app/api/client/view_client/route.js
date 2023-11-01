import { NextResponse } from "next/server";
import mongoose from 'mongoose';
import 'dotenv/config';
import {  clients } from '../../../Schemas/UserSchemas';

export async function POST(request) {

    try {

        await mongoose.connect(process.env.MONGO_URI);
        let data = await request.json();


        let queryUsername = data.username;

        let query = clients.where({ Username: queryUsername});
        let userQuery = await query.findOne();

        if(userQuery === null){
            mongoose.disconnect();
            return NextResponse.json({ "msg": "Client not found"})
        } else {
            mongoose.disconnect();
            let res = { "username" : userQuery.Username, "availability" : userQuery.DatesReserved, "info" : userQuery.Info};
            return NextResponse.json(res);
        }
    } catch (error) {
        return NextResponse.json({"msg": error});
    }
}