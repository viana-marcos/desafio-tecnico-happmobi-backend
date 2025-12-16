import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Car } from "../database/schema/car.schema";

@Injectable()
export class CarRepository {

  constructor(@InjectModel(Car.name) private carModel: Model<Car>) {}

  async getCarList(dataFilter: any): Promise<any> {
    const page = dataFilter.page;
    const size = parseInt(dataFilter.size);
    delete dataFilter.page;
    delete dataFilter.size;
    const keys = Object.keys(dataFilter);
    
    const _filters:any[] = [];
    keys.forEach(key=>{
      const value = dataFilter[key];
      if(value){
        const _filter = {} as any;
        _filter[key] = { $regex: '' + value + '', $options: "i" };
        _filters.push(_filter)
      }
    })
    const totalRecord = await this.carModel.countDocuments({$or: _filters});
    const list = await this.carModel.find({$or: _filters}).limit(size).skip(page > 0 ? size * page : 0);
    let pages = Math.ceil(totalRecord / size); 
    
    return { pages, totalRecord, list};
  }

  async newCar(car): Promise<Car> {
    const createItem = new this.carModel(car);
    return createItem.save(car);
  }

  async update(id: string, car:Car) {    
    return this.carModel.updateOne({_id:id}, {$set: car});
  }

  async findById(id: string): Promise<Car | null> {    
    return this.carModel.findById(new Types.ObjectId(id))
  }

  async deleteOne(id: string){    
    return this.carModel.deleteOne({_id:id})
  }
  
}