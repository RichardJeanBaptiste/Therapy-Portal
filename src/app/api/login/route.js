import { NextResponse } from "next/server";
import mongoose from 'mongoose';
import { therapists, clients } from '../../Schemas/UserSchemas';
import { comparePassword } from '../Server_Functions';
import bcrypt from 'bcrypt';
import 'dotenv/config';



async function findUser(userQuery, queryPassword){

    if(userQuery === null){

        mongoose.disconnect();
        return NextResponse.json({ msg: 'User not found'}, {status: 404})

    } else {

        let checkPassword = await comparePassword(queryPassword, userQuery.Password);

        if(!checkPassword){

            mongoose.disconnect();
            return NextResponse.json({ msg: 'User not found'}, {status: 404})
            
        } else {

            let res = [ userQuery._id, userQuery.Username, userQuery.Info[0].Name];
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


        let query = therapists.where({ Username: queryUsername});
        let userQuery = await query.findOne();

        if(userQuery === null){

            let newQuery = clients.where({ Username: queryUsername});
            let clientQuery = await newQuery.findOne();
            return findUser(clientQuery, queryUsername, queryPassword);

        } else {
            return findUser(userQuery, queryPassword);
        }
                
    } catch (error) {
        console.log(error);
        return NextResponse.json({ msg: 'Server Error'}, {status: 500})
    }
    
}
