import { NextResponse } from "next/server";
import mongoose from 'mongoose';
import 'dotenv/config';
import { User, therapists, clients } from '../../Schemas/UserSchemas';


/**
 * 
 * const userSchema = new mongoose.Schema({
        username: String,
        password: String,
    })

    const TherapistSchema = new mongoose.Schema({
        Username: String,
        Password: String,
        Role: String,
        DatesAvailable: Array,
        Clients: Array,
        Info: Array,
    })

    const ClientSchema = new mongoose.Schema({
        Username: String,
        Password: String,
        Role: String,
        DatesReserved: Array,
        Therapists: Array,
        Info: Array,
    })
 */

export async function POST(request) {

    try {
        await mongoose.connect(process.env.MONGO_URI);
        let x = await request.json();

        if(x.role === "Therapist"){
            let newTherapist = new therapists({
                Username: x.username,
                Password: x.password,
                Role: x.role,
                DatesAvailable: [],
                Clients: [],
                Info: [],
            })

            await newTherapist.save();
            mongoose.disconnect();
            return NextResponse.json({ msg: 'Account Created'}, {status: 200})
        } else if(x.role === "Client") {

            let newClient = new clients({
                Username: x.username,
                Password: x.password,
                Role: x.role,
                DatesReserved: [],
                Therapists: [],
                Info: [],
            })

            await newClient.save();
            mongoose.disconnect();
            return NextResponse.json({ msg: 'Account Created'}, {status: 200})
        } else {

            mongoose.disconnect();
            return NextResponse.json({ msg: 'Role Not Chosen'}, {status: 404})
        }

        // console.log(x.username);
        // console.log(x.password);

        // let newUser = new User({ username: x.username, password: x.password});
        // await newUser.save();

        // mongoose.disconnect();
        // return NextResponse.json({ msg: 'Account Created'}, {status: 200})
    } catch (error) {
        console.log(error);
        return NextResponse.json({msg: 'Internal Server Error'}, {status: 500})
    }
    
}