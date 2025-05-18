

import { Category } from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "../../../../../../lib/ConnectDB";

export async function POST(req: NextRequest) {
    try {
        const { name, description } = await req.json();
        if (!name || !description) {
            return NextResponse.json({
                error: "please fill all the required fields."
            }, {
                status: 400
            })
        }
        await connectToDB();
        const categoryExist = await Category.findOne({ name: name });
        console.log(categoryExist);
        if (categoryExist) {
            return NextResponse.json({
                error: "This category is already exist."
            }, {
                status: 400
            })
        }
        const category = await Category.create({name, description});
        return NextResponse.json({
            message: "This category is created Successfully",
            category: category
        }, {
            status: 201
        })

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