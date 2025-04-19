import {Webhook} from "svix";
import connectDB from "@/config/db";
import User from "@/models/User";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
      await connectToDB(); // Connect to MongoDB
  
      const body = await req.json();
      console.log("Clerk webhook body:", body);
  
      const eventType = body.type;
      const data = body.data;
  
      if (!data) {
        return new Response("No data in webhook", { status: 400 });
      }
  
      if (eventType === "user.created") {
        const { id, email_addresses, username, first_name, last_name } = data;
  
        const email = email_addresses?.[0]?.email_address;
  
        const newUser = new User({
          clerkId: id,
          email,
          username,
          firstName: first_name,
          lastName: last_name,
        });
  
        await newUser.save();
        return new Response("User created", { status: 200 });
      }
  
      if (eventType === "user.deleted") {
        const { id } = data;
        await User.findOneAndDelete({ clerkId: id });
        return new Response("User deleted", { status: 200 });
      }
  
      return new Response("Unhandled event type", { status: 400 });
    } catch (err) {
      console.error("Webhook error:", err);
      return new Response("Webhook error", { status: 500 });
    }
  }