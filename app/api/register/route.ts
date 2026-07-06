import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();

        // validation 
        if (!email || !password) {
            return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
        }

        //check existing user

        //before that check if the connection is established or not
        await connectToDatabase();

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ message: "User already exists" }, { status: 400 });
        }

        // create new user
        await User.create({ email, password });

        return NextResponse.json({ message: "User created successfully" }, { status: 201 });

    } catch (error) {
        console.error("Error in user registration:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
