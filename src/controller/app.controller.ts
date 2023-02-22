import { Iot } from './../schemas/iot.schema';
import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from '../services/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/iot')
  createNewDevice(@Body() iot: Iot) {
    return this.appService.create(iot);
  }
}
