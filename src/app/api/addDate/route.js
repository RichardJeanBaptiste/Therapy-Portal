import { NextResponse } from "next/server";
import mongoose from 'mongoose';
import 'dotenv/config';
import { therapists, clients, calenders } from '../../Schemas/UserSchemas';




export async function POST(request) {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        let x = await request.json();

        let user =  x.user;
        let date = new Date(x.date).toString();

        
        // Save to therapist
        let query = therapists.where({ Username : user });
        let findQuery = await query.findOne();

        let temp = findQuery.DatesAvailable;
        temp.push(date);

        findQuery.DatesAvailable = temp;
        await findQuery.save();

        //Save to calender
        let calQuery = calenders.where({ name: "demo"});
        let newCal = await calQuery.findOne();
       
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
        
        

        return NextResponse.json({ "user": user, "date": date})
    } catch (error) {
        
    }
}

/**
 * newCal.dates.map((x) => {
                if(Object.keys(x)[0] === date){
                    //console.log(Object.keys(x)[0])
                    // let temp3 = x[date];
                    // temp3.push(user);
                    console.log(x[date]);
                    x[date].push(user);

                    newCal.save();
                }
            })


            const filter = { name: "demo" };

        const update = {
            $push: {
              "dates.0.Thu Oct 05 2023 00:00:00 GMT-0400 (Eastern Daylight Time)": "newElement"
            }
        };
 */