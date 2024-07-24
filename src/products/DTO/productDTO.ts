import { IsIn, IsNotEmpty, IsNumber, IsUrl } from 'class-validator';

export class productDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  brand: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsUrl({}, { message: 'Invalid URL' })
  image: string;

  @IsNotEmpty()
  @IsIn(['phones', 'computers', 'home', 'videogames'])
  category: string;
}
