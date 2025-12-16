import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { UserService } from '../../application/service/user.service';
import { JwtAuthGuard } from '../../application/guard/jwt-auth-guard';

@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) { }

  @Post("new")  
  new(@Body() dto: any): any {
    return this.userService.newUser(dto);
  }

  @Delete('/:userId')
  @UseGuards(JwtAuthGuard)
  delete(@Param('userId') userId: string) {
    return this.userService.delete(userId);
  }

  @Put('/:userId')
  @UseGuards(JwtAuthGuard)
  update(@Param('userId') userId: string, @Body() data: any) {
    return this.userService.updateUser(userId, data);
  }

  @Get('/:userId')
  @UseGuards(JwtAuthGuard)
  getUserById(@Param('userId') userId: string): any {
    return this.userService.findById(userId);
  }  

}
