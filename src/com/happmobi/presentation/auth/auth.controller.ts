import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../../application/service/auth.service';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('login')
    signIn(@Body() user: any) {
      return this.authService.signIn(user);
    }
}