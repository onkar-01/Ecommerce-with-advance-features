// import { Product } from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "../../../../lib/ConnectDB";
import { Product } from "@/models/Product";


export async function POST(request: NextRequest) {
  try {
    const { name, description, categoryId, subcategoryId, basePrice, images, attributes } = await request.json();

    // console.log(name,c description, categoryId, subcategoryId, basePrice, images, attributes);

    if (!name || !description || !categoryId || !subcategoryId || !basePrice || !images || !attributes) {
      return NextResponse.json({
        error: "Please fill the all required Fields"
      }, {
        status: 400
      });

    }
    await connectToDB();
    const productExist = await Product.findOne({ name, categoryId, subcategoryId });
    if (productExist) {
      return NextResponse.json({
        error: "Product is already exist in this cateogry."
      }, {
        status: 400
      });
    }

    const productImages = images.map((image: string,index:number) => {
      return {
        productId: "",
        url: image,
        altText: name+" image "+ index,
        position: index
      }
    })
    console.log(productImages);

    const product = await Product.create({ name, description, categoryId, subcategoryId, basePrice, images:productImages, attributes });
    return NextResponse.json({
      message: "This product is created Successfully",
      product: product
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
// 