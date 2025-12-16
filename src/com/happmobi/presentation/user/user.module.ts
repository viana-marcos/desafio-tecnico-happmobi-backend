import { MongooseModule } from "@nestjs/mongoose";
import { forwardRef, Module } from '@nestjs/common';
import { User, UserSchema } from "../../infrastructure/database/schema/user.schema";
import { UserController } from "./user.controller";
import { UserService } from "../../application/service/user.service";
import { UserRepository } from "../../infrastructure/repositories/user.repository";
import { CarModule } from "../car/car.module";
import { CarService } from "../../application/service/car.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), forwardRef(() => CarModule)],
    controllers: [UserController],
    providers: [UserService, UserRepository],
    exports: [UserService, UserRepository]
})
export class UserModule {}