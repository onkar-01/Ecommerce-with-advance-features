// import { Product } from "@/models/Product";
import {  NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    try{
    const { name, description, } = await request.json();

    console.log(name, description,);
    }catch(error){
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
// 