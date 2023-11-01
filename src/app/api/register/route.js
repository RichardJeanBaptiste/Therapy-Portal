import { NextResponse } from "next/server";
import mongoose from 'mongoose';
import 'dotenv/config';
import { therapists, clients } from '../../Schemas/UserSchemas';


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
                Info: {
                    Name: x.name,
                    Age: x.age,
                    Speciality: x.specialty,
                    Bio: x.bio,
                    Education: x.education,
                    YearsWorking: x.yearsWorking
                },
            })

            await newTherapist.save();
            mongoose.disconnect();
            return NextResponse.redirect("http://localhost:3000/login")
            //return NextResponse.json({ msg: 'Account Created'}, {status: 200})
        } else if(x.role === "Client") {

            let newClient = new clients({
                Username: x.username,
                Password: x.password,
                Role: x.role,
                DatesReserved: [],
                Therapists: [],
                Info: {
                    Name: "",
                    Age: "",
                    Bio: ""
                },
            })

            await newClient.save();
            mongoose.disconnect();
            return NextResponse.json({ msg: 'Account Created'}, {status: 200})
        } else {

            mongoose.disconnect();
            return NextResponse.json({ msg: 'Role Not Chosen'}, {status: 404})
        }

    } catch (error) {
        console.log(error);
        return NextResponse.json({msg: 'Internal Server Error'}, {status: 500})
    }
    
}