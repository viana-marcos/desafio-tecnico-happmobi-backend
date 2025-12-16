import { forwardRef, Module } from '@nestjs/common';
import { CarController } from './car.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CarService } from '../../application/service/car.service';
import { Car, CarSchema } from '../../infrastructure/database/schema/car.schema';
import { CarRepository } from '../../infrastructure/repositories/car.repository';
import { UserModule } from '../user/user.module';

@Module({
    imports: [MongooseModule.forFeature([{ name: Car.name, schema: CarSchema }]), forwardRef(() => UserModule)],
    controllers: [CarController],
    providers: [CarService, CarRepository],
    exports: [CarService, CarRepository]  
})
export class CarModule {}
