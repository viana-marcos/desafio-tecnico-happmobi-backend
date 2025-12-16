import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { CarService } from '../../application/service/car.service';
import { JwtAuthGuard } from '../../application/guard/jwt-auth-guard';

@Controller('car')
@UseGuards(JwtAuthGuard)
export class CarController {

  constructor(private readonly carService: CarService) { }

  @Post('new')
  newCar(@Body() car: any) {
    return this.carService.newCar(car);
  }

  @Put('/:carId')
  update(@Param('carId') carId: string, @Body() data: any) {
    return this.carService.update(carId, data);
  }

  @Delete('/:carId')
  delete(@Param('carId') carId: string) {
    return this.carService.deleteOne(carId);
  }

  @Get('')
  getCarById(@Query() id: string): any {
    return this.carService.getById(id);
  }

  @Get('/list')
  getCarList(@Query() dataFilter: any): any {
    return this.carService.getCarList(dataFilter);
  }

  @Put('/to-reserve/:carId/:userId')
  toReserve(@Param('carId') carId: string, @Param('userId') userId: string) {
    return this.carService.toReserve(carId, userId);
  }

  @Put('/end-reserve/:carId/:userId')
  endReserve(@Param('carId') carId: string, @Param('userId') userId: string) {
    return this.carService.endReserve(carId, userId);
  }
}