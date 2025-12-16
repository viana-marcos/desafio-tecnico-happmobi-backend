import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { hash } from 'bcrypt'

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {

  _id: Types.ObjectId;

  @Prop()
  name: string;

  @Prop()
  userName: string;

  @Prop()
  password: string;

  @Prop({default: false})
  admin: boolean;

  @Prop({ required: false })
  picture: string;

  @Prop({type: Types.ObjectId, ref: 'Car'})
  rentedCar: Types.ObjectId;  

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Car' }] })
  reservationHistory: Types.ObjectId[];
}

const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function(next){

    const hashedPassword =  await hash(this.password, 10)
    this.password = hashedPassword;

    next()
});
export {
  UserSchema
};