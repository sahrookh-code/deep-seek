import {Webhook} from "svix";
import connectDB from "@/config/db";
import User from "@/models/User";
import { headers } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(req) {
    const wh=new Webhook(process.env.SIGNING_SECRET)
    const headerspayload = await headers()
    const svixHeaders = { "svix-id": headerspayload.get("svix-id"),
        "svix-timestamp": headerspayload.get("svix-timestamp"),
               
        "svix-signature": headerspayload.get("svix-signature"),

    };

    //get the payload verify

    const payload = await req.json()
    const body = JSON.stringify(payload)
    const{data, type} = wh.verify(body, svixHeaders)
    
    //prepare the user data and save in database

    const userData = {
        _id: data.id,
        name: '${data.first_name} ${data.last_name}',
        email: data.email_address[0].email_address,
        image: data.image_url,
    };
    await connectDB()

    switch(type){
        case 'user.created':
            await User.create(userData);

            break;
        case 'user.updated':

            await User.findByIdAndUpdate(data.id, userData);
            break;
        case 'user.created':

            await User.create(userData);
            break;
        case 'user.deleted':

            await User.findByIdAndDelete(data.id);
            break;
            
         default:

            break;
    }
    return NextRequest.json({message: "success"});
}