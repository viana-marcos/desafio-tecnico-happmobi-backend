import { Module } from '@nestjs/common';
import { CarController } from './car.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CarService } from '../../application/service/car.service';
import { Car, CarSchema } from '../../infrastructure/database/schema/car.schema';
import { CarRepository } from '../../infrastructure/repositories/car.repository';
import { UserRepository } from '../../infrastructure/repositories/user.repository';
import { UserModule } from '../user/user.module';
import { UserService } from '../../application/service/user.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: Car.name, schema: CarSchema }]), UserModule],
    controllers: [CarController],
    providers: [CarService, CarRepository]   
})
export class CarModule {}
