import { IotService } from './../services/iot.service';
import { Iot } from '../schemas/iot.schema';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller()
export class IotController {
  constructor(private readonly iotService: IotService) {}

  @Post('/iot')
  createNewDevice(@Body() iot: Iot) {
    return this.iotService.create(iot);
  }

  @Get('/iot')
  returnAllDevices() {
    return this.iotService.returnAll();
  }
}
