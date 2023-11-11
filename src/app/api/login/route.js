import { NextResponse } from "next/server";
import mongoose from 'mongoose';
import 'dotenv/config';
import { User, therapists, clients } from '../../Schemas/UserSchemas';

async function findUser(userQuery, queryUsername, queryPassword){

    if(userQuery === null){

        mongoose.disconnect();
        return NextResponse.json({ msg: 'User not found'}, {status: 404})

    } else {

        if(userQuery.Password !== queryPassword){

            mongoose.disconnect();
            return NextResponse.json({ msg: 'User not found'}, {status: 404})
            
        } else {

            let res = [ userQuery._id, userQuery.Username];
            mongoose.disconnect();
            return NextResponse.json({ msg: res}, {status: 200})
        }   
    } 
}

export async function POST(request) {

    try {

        await mongoose.connect(process.env.MONGO_URI);

        let data = await request.json();

        let queryUsername = data.username;
        let queryPassword = data.password;
        //let queryRole = data.role;


        let query = therapists.where({ Username: queryUsername});
        let userQuery = await query.findOne();

        if(userQuery === null){

            let newQuery = clients.where({ Username: queryUsername});
            let clientQuery = await newQuery.findOne();
            return findUser(clientQuery, queryUsername, queryPassword);

        } else {
            return findUser(userQuery, queryUsername, queryPassword);
        }

        // if(queryRole === "Therapist"){

        //     let query = therapists.where({ Username: queryUsername});
        //     let userQuery = await query.findOne();

        //     return findUser(userQuery, queryUsername, queryPassword);
        // } else if(queryRole === "Client") {
        //     let query = clients.where({ Username: queryUsername});
        //     let userQuery = await query.findOne();

        //     return findUser(userQuery, queryUsername, queryPassword);
        // } else {
        //     return NextResponse.json({ msg: 'Role not chosen'}, {status: 404})
        // }
                
    } catch (error) {
        console.log(error);
        return NextResponse.json({ msg: 'Server Error'}, {status: 500})
    }
    
}
