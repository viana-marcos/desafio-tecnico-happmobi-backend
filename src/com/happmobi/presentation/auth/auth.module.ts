import { Module } from '@nestjs/common';
import { AuthService } from '../../application/service/auth.service';
import { AuthController } from './auth.controller';

import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from '../../application/strategy/jwtstrategy';

@Module({
  imports: [
    UserModule,   
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'JWT_SECRET'      
    }),
  ],  
  providers: [AuthService, JwtStrategy],  
  controllers: [AuthController]
})
export class AuthModule {}
