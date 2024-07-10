import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { productDTO } from './DTO/productDTO';
import { updateProductDTO } from './DTO/updateProductDTO';

@Controller('products')
export class ProductsController {

    constructor(
        private productsService: ProductsService
    ){}

    @Get()
    async getProducts(){
        return this.productsService.getProducts();
    }

    @Get(':id')
    async getProduct(@Param('id') id: string){
        return this.productsService.getProduct(id)
    }

    @Post()
    async createProduct(@Body() productdto: productDTO){
        this.productsService.createProduct(productdto)
    }

    @Put(':id')
    async updateProduct(@Param ('id') id: string, @Body() productdto:updateProductDTO) {
        return this.productsService.updateProduct(id, productdto)
    }

    @Delete(':id')
    async deleteProduct(@Param('id') id:string){
        return this.productsService.deleteProduct(id)
    }
    
}
