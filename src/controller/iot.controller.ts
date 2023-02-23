import { RabbitmqService } from './../services/rabbitmq.service';
import { IotService } from './../services/iot.service';
import { Iot } from '../schemas/iot.schema';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller()
export class IotController {
  constructor(
    private readonly iotService: IotService,
    private readonly rabbitmqService: RabbitmqService,
  ) {}

  @Post('/iot')
  async createNewDevice(@Body() iot: Iot) {
    await this.rabbitmqService.startQueue(iot);
    return 'Iot Cadastrado';
  }

  @Get('/iot')
  returnAllDevices() {
    return this.iotService.returnAll();
  }
}
