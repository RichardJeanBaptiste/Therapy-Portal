import { NextResponse } from "next/server";
import mongoose from 'mongoose';
import 'dotenv/config';
import { clients } from '../../../Schemas/UserSchemas';


export async function POST(request){
    try {
        
        await mongoose.connect(process.env.MONGO_URI);
        let data = await request.json();

        let queryUsername = data.username;
        let queryInfo = data.newInfo;

        let query = clients.where({ Username: queryUsername});
        let userQuery = await query.findOne();

        const filter = { Username: queryUsername };

        const update = {
            $set: {
                "Info.0.Name": queryInfo.Name,
                "Info.0.Age": queryInfo.Age,
                "Info.0.Bio": queryInfo.Bio
            }
        }

        await clients.findOneAndUpdate(filter, update);
        
        mongoose.disconnect();
        return NextResponse.json({ "msg": `${queryUsername}: Info Updated`});

    } catch (error) {
        mongoose.disconnect();
        return NextResponse.json({"msg": `${error}`})
    }
}