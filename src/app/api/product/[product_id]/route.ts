import { Product } from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "../../../../lib/ConnectDB";

export async function GET(request: NextRequest,{params}: { params: Promise<{ product_id: string }> }) {
    try {
        const { product_id } = await params;
        if (!product_id) {
            return NextResponse.json({ error: "Product ID is required." }, { status: 400 });
        }
        await connectToDB();
        const product = await Product.findOne({_id:product_id});
        if(!product){
            return NextResponse.json(
            {
                error:`No Proudct Found`
            },{
                status:400
            }
        )
        }

        return NextResponse.json(
            {
                data:product
            },{
                status:400
            }
        );
    }catch(error){
        return NextResponse.json(
            {
                error:`error while geting the data ${error}`
            },{
                status:400
            }
        )
    }
    
}