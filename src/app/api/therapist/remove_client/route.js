import { NextResponse } from "next/server";
import mongoose from 'mongoose';
import 'dotenv/config';
import { therapists } from '../../../Schemas/UserSchemas';


export async function POST(request){

    try {

        await mongoose.connect(process.env.MONGO_URI);
        let data = await request.json();

        let queryUsername = data.username;
        let queryClient = data.clientname;

        console.log(queryClient);

        let query = therapists.where({ Username: queryUsername});
        let userQuery = await query.findOne();
        let dates = userQuery.DatesScheduled;
        let clientExists = false;

        for(let i = 0; i < userQuery.Clients.length; i++){
            if(userQuery.Clients[i] === queryClient){
                clientExists = true;
            }
        }

        if(clientExists) {

            await therapists.findOneAndUpdate(
                { Username: queryUsername },
                { $pull: {Clients: queryClient}},
                { new: true } // This option returns the modified document
            )
            .then(updatedDocument => {
                if (updatedDocument) {
                    //console.log('Item removed:', updatedDocument);
                } else {
                    console.log('Document not found.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });


            // Find client and remove from DatesScheduled 
            for(let i = 0; i < dates.length; i++){
                let key = Object.keys(dates[i]);
                let item = dates[i][key]

                for(let j = 0; j < item.length; j++){

                    let name = item[j][0];

                    if(name === queryClient){

                        let nameArr = item[j];
                        let index = dates[i][key].indexOf(nameArr);
                        dates[i][key].splice(index, 1);
                    }
                }
            }

            
            // Empty Array
            userQuery.DatesScheduled = [{}];
            await userQuery.save();

            // Save new Array
            userQuery.DatesScheduled = dates;
            await userQuery.save();


            mongoose.disconnect();
            return NextResponse.json({"msg" : "Client Deleted"});

        } else {

            mongoose.disconnect();
            return NextResponse.json({"msg" : "Client Does Not Exist"});
        }


        
    
    } catch(error) {
        console.log(error);
        return NextResponse.json({"msg": "Server Error"}, {status: 500});
    }
}

       

        /**
         * Find Index
         * Find Date
         * Find Nested Index
         */
        // await therapists.findOneAndUpdate(
        //     { Username: queryUsername },
        //     { $unset: {"DatesScheduled.0.Wed Nov 22 2023 00:00:00 GMT-0500 (Eastern Standard Time).0": 0}},
        //     { $pull: {"DatesScheduled.0.Wed Nov 22 2023 00:00:00 GMT-0500 (Eastern Standard Time)": null}},
        //     { new: true } // This option returns the modified document
        // )
        // .then(updatedDocument => {
        //     if (updatedDocument) {
        //         console.log('Item removed:', updatedDocument);
        //     } else {
        //         console.log('Document not found.');
        //     }
        // })
        // .catch(error => {
        //     console.error('Error:', error);
        // });
