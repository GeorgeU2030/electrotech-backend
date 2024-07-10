import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductSchema } from 'src/schemas/product.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth/auth.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }])
  ],
  providers: [ProductsService, 
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ],
  controllers: [ProductsController],
  exports: [ProductsService]
})
export class ProductsModule {}
