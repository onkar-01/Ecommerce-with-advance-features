import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "../../../../lib/ConnectDB";
import { Product } from "@/models/Product";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const categoryId = searchParams.get("categoryId");
        const subcategoryId = searchParams.get("subcategoryId");
        const page = searchParams.get("page") || 1;
        const limit = searchParams.get("limit") || 10;
        await connectToDB();
        const query = {
            ...(categoryId && { categoryId: categoryId }),
            ...(subcategoryId && { subcategoryId: subcategoryId })
        }
        const products = await Product.find(query).skip((Number(page) - 1) * Number(limit)).limit(Number(limit));
        const totalProducts = await Product.countDocuments(query);

        if (products.length === 0) {
            return NextResponse.json({
                message: "No Products Found",
                products: []
            }, {
                status: 404
            });
        }
        return NextResponse.json({
            message: "All Products",
            products: products,
            totalProducts: totalProducts,
            limit:limit,
            page: page,
        }, {
            status: 200
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