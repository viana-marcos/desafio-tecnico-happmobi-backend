import { MongooseModule } from "@nestjs/mongoose";
import { Module } from '@nestjs/common';
import { User, UserSchema } from "../../infrastructure/database/schema/user.schema";
import { UserController } from "./user.controller";
import { UserService } from "../../application/service/user.service";
import { UserRepository } from "../../infrastructure/repositories/user.repository";

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
    controllers: [UserController],
    providers: [UserService, UserRepository],
    exports: [UserService, UserRepository]
})
export class UserModule {}