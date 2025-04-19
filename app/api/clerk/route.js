import {Webhook} from "svix";
import connectDB from "@/config/db";
import User from "@/models/User";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const wh = new Webhook(process.env.SIGNING_SECRET);
        const headerspayload = await headers();
        const svixHeaders = {
            "svix-id": headerspayload.get("svix-id"),
            "svix-timestamp": headerspayload.get("svix-timestamp"),
            "svix-signature": headerspayload.get("svix-signature"),
        };

        const payload = await req.json();
        const body = JSON.stringify(payload);
        const {data, type} = wh.verify(body, svixHeaders);
        console.log('Webhook event type:', type, 'for user:', data.id);

        await connectDB();
        const userData = {
            _id: data.id,
            name: data.first_name ? `${data.first_name} ${data.last_name || ''}`.trim() : 'Unknown',
            email: data.email_addresses && data.email_addresses.length > 0 
                ? data.email_addresses[0].email_address 
                : undefined,
            image: data.image_url || undefined,
        };

        console.log('Processing user data:', userData);

        switch(type) {
            case 'user.created':
                await User.create(userData);
                console.log('User created successfully:', data.id);
                break;
            case 'user.updated':
                const updatedUser = await User.findByIdAndUpdate(data.id, userData, { new: true });
                console.log('User updated successfully:', data.id);
                break;
            case 'user.deleted':
                const deletedUser = await User.findByIdAndDelete(data.id);
                console.log('User deleted successfully:', data.id);
                break;
            default:
                console.log('Unhandled webhook event type:', type);
                break;
        }

        return NextResponse.json({ message: "success" }, { status: 200 });
    } catch (error) {
        console.error('Webhook error:', error);
        return NextResponse.json(
            { error: 'Webhook handler failed' },
            { status: 500 }
        );
    }
}