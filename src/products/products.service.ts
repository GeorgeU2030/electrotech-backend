import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/schemas/product.schema';

@Injectable()
export class ProductsService {

    constructor(
        @InjectModel(Product.name) private productModel: Model<Product>
    ) {}

    async getProducts() : Promise<Product[]> {
        const allProducts = await this.productModel.find().exec();
        return allProducts;
    }

    async getProduct(id: string) {

        const product = this.productModel.findById(id);

        if (!product) {
            return null;
        }

        return product;
    }

    async createProduct(product: Product) {
        return this.productModel.create(product);
    }

    async updateProduct(id: string, product: Product) {
        return this.productModel.findByIdAndUpdate(id, product, { new: true });
    }

    async deleteProduct(id: string) {
        return this.productModel.findByIdAndDelete(id);
    }
}
