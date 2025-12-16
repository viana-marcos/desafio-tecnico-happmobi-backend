import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type CarDocument = HydratedDocument<Car>;

@Schema()
export class Car {
  
  _id: Types.ObjectId;

  @Prop({ required: true })
  modelName: string;

  @Prop({ required: true })
  bodyType: string;

  @Prop({ required: true })
  engineType: string;

  @Prop({ required: true })
  numberOfSeats: string;

  @Prop({ required: true })
  picture: string;

  @Prop({ default: false })
  isAllocated: boolean;
}

const CarSchema = SchemaFactory.createForClass(Car);

export {
  CarSchema
};