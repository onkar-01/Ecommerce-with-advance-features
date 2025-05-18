import { Subcategory } from "@/models/Product";
import { NextResponse } from "next/server";
import { connectToDB } from "../../../../../lib/ConnectDB";

export async function GET() {
    try {
        await connectToDB();
        const subCategoryList = await Subcategory.find();
        if (!subCategoryList.length) {
            return NextResponse.json({
                error: `No Subcategory Found.`
            }, {
                status: 400
            })
        }
        return NextResponse.json({
            data: subCategoryList
        }, {
            status: 200
        })
    } catch (error) {
        return NextResponse.json({
            error: `error while geting the data ${error}`
        }, {
            status: 400
        })
    }
}