import { Subcategory } from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "../../../../../../lib/ConnectDB";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ category_id: string }> }
) {
  try {
    const { category_id } = await params;
    if (!category_id) {
        return NextResponse.json({ error: "Category ID is required." }, { status: 400 });
    }
    await connectToDB();        
    const subCategoryList = await Subcategory.find({ categoryId: category_id });

    if (!subCategoryList || subCategoryList.length === 0) {
      return NextResponse.json({ error: "No Subcategory Found." }, { status: 404 });
    }

    return NextResponse.json({ data: subCategoryList }, { status: 200 });
  } catch (error) {
    console.error("Error while getting subcategories:", error);
    return NextResponse.json(
      { error: `Error while getting the data: ${error instanceof Error ? error.message : String(error)}` },
      { status: 500 }
    );
  }
}
