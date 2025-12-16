import { Module } from '@nestjs/common';
import { AppController } from './com/happmobi/presentation/app.controller';
import { AppService } from './com/happmobi/application/service/app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './com/happmobi/presentation/user/user.module';
import { AuthModule } from './com/happmobi/presentation/auth/auth.module';
import { CarModule } from './com/happmobi/presentation/car/car.module';
import { ConfigModule } from '@nestjs/config';
 
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATA_BASE_URL || 'mongodb://localhost/vehicle-reservations'),
    UserModule,
    AuthModule,
    CarModule
  ],
  exports: [UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
