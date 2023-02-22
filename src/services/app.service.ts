import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Iot, IotDocument } from 'src/schemas/iot.schema';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Iot.name) private iotDeviceModel: Model<IotDocument>,
  ) {}

  async create(dispositivo: Iot): Promise<Iot> {
    const newIotDevice = new this.iotDeviceModel(dispositivo);
    return newIotDevice.save();
  }
}
