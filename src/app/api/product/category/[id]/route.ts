import { Category } from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "../../../../../lib/ConnectDB";
interface IProps{
    params:Promise<{id:string}>
}
export async function GET(req:NextRequest,{ params }:IProps ){
    try {
        const { id } = await params;
        await connectToDB();
        const category = await Category.findOne({_id:id});

        if(!category){
            return NextResponse.json({
            error:`No Category Found.`
        },{
            status:400
        })
        }
        return NextResponse.json({
            data:category
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