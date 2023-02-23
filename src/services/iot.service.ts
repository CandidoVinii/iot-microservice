import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Iot, IotDocument } from 'src/schemas/iot.schema';

@Injectable()
export class IotService {
  constructor(
    @InjectModel(Iot.name) private iotDeviceModel: Model<IotDocument>,
  ) {}

  async create(device: Iot): Promise<Iot> {
    const newIotDevice = new this.iotDeviceModel(device);
    return newIotDevice.save();
  }

  async returnAll(): Promise<Iot[]> {
    const returnAllDevices = this.iotDeviceModel.find().exec();
    return returnAllDevices;
  }
}
