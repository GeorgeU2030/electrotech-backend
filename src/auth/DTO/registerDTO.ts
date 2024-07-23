import { MinLength } from 'class-validator';

export class registerDTO {
  name: string;
  email: string;

  @MinLength(7, { message: 'Password must be at least 7 characters long' })
  password: string;
}
