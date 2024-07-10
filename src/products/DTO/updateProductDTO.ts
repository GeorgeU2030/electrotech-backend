import { IsUrl, IsOptional, IsNumber } from "class-validator";

export class updateProductDTO {

    @IsOptional()
    name: string;

    @IsOptional()
    brand: string;

    @IsOptional()
    @IsNumber()
    price: number;

    @IsOptional()
    description: string;

    @IsOptional()
    image: string;
}