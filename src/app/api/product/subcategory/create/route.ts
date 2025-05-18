import { Subcategory } from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "../../../../../../lib/ConnectDB";

export async function POST(req:NextRequest){
    try{
        const {name,description,categoryId} = await req.json();
        await connectToDB();
        if(!name || !description || !categoryId){
            return NextResponse.json({
                error: "Please fill the all required Fields"
            },{
                status: 400
            })
        }

        const subcategoryExist =  await Subcategory.findOne({name,categoryId});
        if(subcategoryExist){
            return NextResponse.json({
                error: "Subcategory is already exist in this cateogry."
            },{
                status: 400
            })
        }

        const subcategory = await Subcategory.create({name,description,categoryId});
        return NextResponse.json({
            message: "This subcategory is created Successfully",
            category: subcategory
        }, {
            status: 201
        })
    }catch(error){
        return NextResponse.json({
                error: `error while creating the subcategory ${error}`
            },{
                status: 400
            })
    }
}