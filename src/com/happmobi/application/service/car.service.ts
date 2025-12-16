import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserRepository } from "../../infrastructure/repositories/user.repository";
import { User } from "../../infrastructure/database/schema/user.schema";
import { CarRepository } from "../../infrastructure/repositories/car.repository";
import { Car } from "../../infrastructure/database/schema/car.schema";
import { UserService } from "./user.service";
import { Types } from "mongoose";

@Injectable()
export class CarService {

  constructor(private readonly carRepository: CarRepository, private readonly userRepository: UserRepository ) { }

  async newCar(userRequest: any): Promise<Car> {    
    return this.carRepository.newCar(userRequest);
  }

  async update(carId: string,  data: any) {    
    return this.carRepository.update(carId, data);
  }

  async deleteOne(carId: string) {    
    return this.carRepository.deleteOne(carId);
  }

  async getById(id: string): Promise<Car | null> {    
    return this.carRepository.findById(id);
  }

  async getCarList(filter: any): Promise<Car[]> {    
    return this.carRepository.getCarList(filter);
  }

  async toReserve(carId: string, userId: string){     
     await this.carRepository.update(carId, {isAllocated: true} as Car);
     await this.userRepository.toReserve(userId, carId);
  }
  
  async endReserve(carId: string, userId: string){     
     await this.carRepository.update(carId, {isAllocated: false} as Car);
     await this.userRepository.update(userId, {rentedCar: null} as any);
  }

}
