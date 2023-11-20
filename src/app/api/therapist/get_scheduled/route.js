import { NextResponse } from "next/server";
import mongoose from 'mongoose';
import 'dotenv/config';
import { therapists } from '../../../Schemas/UserSchemas';

export async function POST(request) {

    try {

        await mongoose.connect(process.env.MONGO_URI);
        let data = await request.json();

        let queryUsername = data.username;
        let queryDate = new Date(data.date).toString();

        let query = therapists.where({ Username: queryUsername});
        let userQuery = await query.findOne();
        let response = [];
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
        

        if(userQuery === null){
            mongoose.disconnect();
            return NextResponse.json({ "msg": "Therapist not found"});
        } else {

            if(doesKeyExist) {
                let arr = userQuery.DatesScheduled[finalIndex][queryDate];

                if(arr === undefined){
                    mongoose.disconnect();
                    return NextResponse.json({"msg": response});
                } else {

                    arr.forEach((x) => {
                        response.push(x[0]);
                    })

                    mongoose.disconnect();
                    return NextResponse.json({"msg": response});
                }
            } else {
                
                mongoose.disconnect();
                return NextResponse.json({"msg": response});
            }
            
            
            

            
        }
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({ "msg" : `${error}`});
    }
}