import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { productDTO } from './DTO/productDTO';
import { updateProductDTO } from './DTO/updateProductDTO';
import { Roles } from 'src/auth/roles/roles.decorator';
import { Role } from 'src/auth/roles/roles';

@Controller('products')
export class ProductsController {

    constructor(
        private productsService: ProductsService
    ){}

    @Get()
    @Roles(Role.Admin, Role.User)
    async getProducts(){
        return this.productsService.getProducts();
    }

    @Get(':id')
    @Roles(Role.Admin, Role.User)
    async getProduct(@Param('id') id: string){
        return this.productsService.getProduct(id)
    }

    @Post()
    @Roles(Role.Admin)
    async createProduct(@Body() productdto: productDTO){
        this.productsService.createProduct(productdto)
    }

    @Put(':id')
    @Roles(Role.Admin)
    async updateProduct(@Param ('id') id: string, @Body() productdto:updateProductDTO) {
        return this.productsService.updateProduct(id, productdto)
    }

    @Delete(':id')
    @Roles(Role.Admin)
    async deleteProduct(@Param('id') id:string){
        return this.productsService.deleteProduct(id)
    }
    
}
