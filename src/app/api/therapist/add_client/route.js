import { NextResponse } from "next/server";
import mongoose from 'mongoose';
import 'dotenv/config';
import { therapists, clients } from '../../../Schemas/UserSchemas';

export async function POST(request) {

    try {

        await mongoose.connect(process.env.MONGO_URI);
        let data = await request.json();

        let queryDate = new Date(data.newDate).toString();
        let queryTherapist = data.therapist;
        let queryClient = data.client;
        let queryTime = data.time;
        let queryDuration = data.duration;

        let query = therapists.where({ Username: queryTherapist});
        let userQuery = await query.findOne();

        if(userQuery.Clients.includes(queryClient) === false){
            userQuery.Clients.push(queryClient);
            //console.log(userQuery.Clients);
            await userQuery.save();
        } else {
            //console.log("Client Exists");
        }

            let doesKeyExist = false;
            let index = 0;
            let finalIndex;

            userQuery.DatesScheduled.map((x) => {
                if(Object.keys(x)[0] === queryDate){
                    doesKeyExist = true;
                    finalIndex = index;
                    return true;
                } else {
                    index +=1;
                }
            })

            if(doesKeyExist){

                const filter = { Username: queryTherapist };
    
                let updatestring = "DatesScheduled." + finalIndex.toString() + "." + queryDate;

                // Check if time is available
                
                const update = {
                    $push: {
                        [updatestring]: [queryClient, queryTime, queryDuration]
                    }
                }
                
                await therapists.findOneAndUpdate(filter, update);
                mongoose.disconnect();
                return NextResponse.json({"msg": `Date: ${queryDate} Reserved`});
            } else {
                // add to scheduled dates
                // Check If Date Already Scheduled
                let newDate = { [new Date(queryDate).toString()] : [[queryClient, queryTime, queryDuration]]}
                userQuery.DatesScheduled.push(newDate);
                await userQuery.save();

                mongoose.disconnect();
                return NextResponse.json({"msg": `Date: ${queryDate} Reserved`});
            }
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({ "msg" : error });
    }
}
