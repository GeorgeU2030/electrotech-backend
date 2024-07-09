import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { MinLength } from "class-validator";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  @MinLength(7, { message: 'Password must be at least 7 characters' })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);