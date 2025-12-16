import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../database/schema/user.schema";
import { Model, Types } from "mongoose";


@Injectable()
export class UserRepository {

  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async newUser(user): Promise<User> {
    const createItem = new this.userModel(user);
    return createItem.save(user);
  }

  async update(id: string, user:User) {    
      return this.userModel.findByIdAndUpdate({_id:id}, {$set: user});
  }

  async toReserve(id: string, carId: string) {
    const carObjectId = new Types.ObjectId(carId);  
      return this.userModel.findByIdAndUpdate(
        {_id:id},        
        {
          $set: {rentedCar: carObjectId},
          $push: { reservationHistory: carObjectId }
        });
  }

  async findOne(userName): Promise<User | null> {    
    return this.userModel.findOne({userName: userName})
  }

  async findById(id: string): Promise<User | null> {    
      return this.userModel.findById(new Types.ObjectId(id), {password:0})
      .populate("rentedCar")
      .populate("reservationHistory")
  }

  async deleteOne(id: string){    
    return this.userModel.deleteOne({_id:id})
  }
  
}