import { Test, TestingModule } from '@nestjs/testing';
import { IotController } from '../src/controller/iot.controller';
import { IotService } from '../src/services/iot.service';

describe('AppController', () => {
  let appController: IotController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [IotController],
      providers: [IotService],
    }).compile();

    appController = app.get<IotController>(IotController);
  });
});
