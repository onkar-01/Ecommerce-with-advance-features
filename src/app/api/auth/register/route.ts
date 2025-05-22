import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "../../../../lib/ConnectDB";
import User from "@/models/User";

export async function POST(request: NextRequest) {
    try {
        const { name, email, password } = await request.json();
        if (!name || !email || !password) {
            return NextResponse.json({
                error: "Please fill the all required Fields"
            }, {
                status: 400
            });
        }
        await connectToDB();
        const userExist = await User.findOne({ email });
        if (userExist) {
            return NextResponse.json({
                error: "User is already exist with this email."
            }, {
                status: 400
            });
        }
        const user = await User.create({ name, email, password });
        console.log(user);
        return NextResponse.json({
            message: "User is created successfully",
            user: user
        }, {
            status: 201
        });
    } catch (error) {
        return NextResponse.json(
            {
                error: error
            },
            {
                status: 500
            }
        )
    }
}