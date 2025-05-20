import { Category } from "@/models/Product";
import { NextResponse } from "next/server";
import { connectToDB } from "../../../../lib/ConnectDB";

export async function GET(){
    try {
        await connectToDB();
        const categoryList = await Category.find();
        if(!categoryList.length){
            return NextResponse.json({
            error:`No Categories Found.`
        },{
            status:400
        })
        }
        return NextResponse.json({
            data: categoryList
        },{
            status:200
        })
    }catch(error){
        return NextResponse.json({
            error:`error while geting the data ${error}`
        },{
            status:400
        })
    }
}