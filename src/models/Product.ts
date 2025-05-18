import mongoose, { model, models, Schema } from "mongoose";


export interface ICategory {
    _id?: mongoose.Types.ObjectId;
    name: string;
    description?: string;
}

const categorySchema = new Schema<ICategory>({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
});


export interface ISubcategory {
    _id?: mongoose.Types.ObjectId;
    name: string;
    categoryId: mongoose.Types.ObjectId;
    description?: string;
}

const subCategorySchema = new Schema<ISubcategory>({
    name: {
        type: String,
        required: true
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    description: {
        type: String
    }
});


export interface IProductImage {
    _id?: mongoose.Types.ObjectId;
    // productId: mongoose.Types.ObjectId;
    url: string;
    altText?: string;
    position: number;
}
const productImageSchema = new Schema<IProductImage>({
    // productId: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Product',
    //     required: true,
    // },
    url: { type: String, required: true },
    altText: { type: String },
    position: { type: Number, default: 0 }
});



export interface ISKU { // --- SKU / Stock / Price ---
    _id?: mongoose.Types.ObjectId;
    productId: mongoose.Types.ObjectId;
    code: string;
    attributes: Record<string, string>; // e.g., { size: "M", color: "Red" }
    price: IPrice;
    stock: IStock;
}
export interface IStock {
    skuId: mongoose.Types.ObjectId;
    quantity: number;
    lowStockThreshold?: number;
    updatedAt: Date;
}

export interface IPrice {
    skuId: mongoose.Types.ObjectId;
    originalPrice: number;
    discountId?: string;
}
const SKUschema = new Schema<ISKU>({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    code: { type: String, required: true, unique: true },
    attributes: { type: Map, of: String }, // e.g. { size: "M", color: "Red" }
    stock: {
        quantity: { type: Number, default: 0 },
        lowStockThreshold: { type: Number, default: 5 },
        updatedAt: { type: Date, default: Date.now }
    },
    price: {
        originalPrice: { type: Number, required: true },
        discount: { type: mongoose.Schema.Types.ObjectId, ref: 'Discount' }
    }
});


export interface IDiscount {
    _id?: mongoose.Types.ObjectId;
    name: string;
    percentage?: number; // e.g., 10 for 10%
    amount?: number;     // e.g., 5 for $5 off
    startDate?: Date;
    endDate?: Date;
    isActive: boolean;
}

const discountSchema = new Schema<IDiscount>({
    name: { type: String, required: true },
    percentage: { type: Number }, // e.g. 10 for 10%
    amount: { type: Number }, // e.g. $5 off
    startDate: { type: Date },
    endDate: { type: Date },
    isActive: { type: Boolean, default: true }
});



export interface IAttribute {
    _id?: mongoose.Types.ObjectId;
    name: string; // e.g., size, color
    possibleValues: string[];
}

const attributeSchema = new Schema<IAttribute>({
    name: { type: String, required: true }, // e.g. size, color
    possibleValues: [{ type: String, required: true }]
});



export interface IProduct {
    _id?: mongoose.Types.ObjectId;
    name: string;
    description?: string;
    categoryId: mongoose.Types.ObjectId;
    subcategoryId?: mongoose.Types.ObjectId;
    basePrice: number;
    images: IProductImage[];
    attributes: IAttribute[];

    createdAt: Date;
    updatedAt: Date;
}

const productSchema = new Schema<IProduct>({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    subcategoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
    },
    basePrice: {
        type: Number,
        required: true,
    },
    images: [productImageSchema],
    attributes: [attributeSchema],
})


export const AttributeSchema = models?.AttributeSchema || model<IAttribute>('AttributeSchema', attributeSchema);

export const DiscountSchema = models?.DiscountSchema || model<IDiscount>('DiscountSchema', discountSchema);

export const SKUSchema = models?.SKUSchema || model<ISKU>('SKUSchema', SKUschema);

export const ProductImage = models?.ProductImage || model<IProductImage>('ProductImage', productImageSchema);

export const Subcategory = models?.Subcategory || model<ISubcategory>('Subcategory', subCategorySchema);

export const Category = models?.Category || model<ICategory>('Category', categorySchema);

export const Product = models?.Product || model<IProduct>('Product', productSchema);


