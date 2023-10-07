import { NextResponse } from "next/server";
import mongoose from 'mongoose';
import 'dotenv/config';
import { therapists, calenders } from '../../../Schemas/UserSchemas';

// async function save_date_to_calender(date) {

//     let calQuery = calenders.where({ name: "demo"});
//     let newCal = await calQuery.findOne();

//     date = new Date(date).toString();
    
//     let doesKeyExist = false;
//     let index = 0;
//     let finalIndex;
    
//     newCal.dates.map((x) => {
//         if(Object.keys(x)[0] === date){
//             doesKeyExist = true;
//             finalIndex = index;
//             return true;
//         } else {
//             index +=1;
//         }
//     })

//     if(doesKeyExist){

//         const filter = { name: "demo" };

//         let updatestring = "dates." + finalIndex.toString() + "." + date;

//         const update = {
//             $push: {
//                 [updatestring]: user
//             }
//         }
        
//         await calenders.findOneAndUpdate(filter, update);
//     } else {

//         newCal.dates.push({[new Date(date).toString()]: [ user ]});
//         await newCal.save();
//     }
// }

export async function POST(request) {
    try {
        
        await mongoose.connect(process.env.MONGO_URI);
        let data = await request.json();

        let queryUsername = data.username;
        let queryDate = data.reserveDate;

        let query = therapists.where({ Username: queryUsername});
        let userQuery = await query.findOne();

        
        if(userQuery === null){
            mongoose.disconnect();
            return NextResponse.json({ "msg": "Therapist not found"})
        } else {
            
            // remove date from dates available
            let res = userQuery.DatesAvailable;
            res.splice(res.indexOf(queryDate), 1);
            userQuery.DatesAvailable = res;

            // add to scheduled dates
            userQuery.DatesScheduled.push(queryDate);
            await userQuery.save();


            // save to calender
            let calQuery = calenders.where({ name: "demo"});
            let newCal = await calQuery.findOne();

            let date = new Date(queryDate).toString();
            let user = queryUsername;

            let doesKeyExist = false;
            let index = 0;
            let finalIndex;

            newCal.dates.map((x) => {
                if(Object.keys(x)[0] === date){
                    doesKeyExist = true;
                    finalIndex = index;
                    return true;
                } else {
                    index +=1;
                }
            })

            if(doesKeyExist){

                const filter = { name: "demo" };
        
                let updatestring = "dates." + finalIndex.toString() + "." + date;
        
                const update = {
                    $push: {
                        [updatestring]: user
                    }
                }
                
                await calenders.findOneAndUpdate(filter, update);
            } else {
                
                
                newCal.dates.push({[new Date(date).toString()]: [ user ]});
                await newCal.save();
            }

            mongoose.disconnect();
            return NextResponse.json({"msg": `Date: ${queryDate} Reserved`});
        }
    } catch (error) {
        return NextResponse.json({"msg": `Server Error : ${error}`}, {status: 500});
    }
}