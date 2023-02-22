import { Module } from '@nestjs/common';
import { IotController } from './controller/iot.controller';
import { IotService } from './services/iot.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Iot, IotSchema } from './schemas/iot.schema';

const mongoUrl: string =
  process.env.MONGO_DB || 'mongodb://localhost:27017/iot-dev';

@Module({
  imports: [
    MongooseModule.forRoot(mongoUrl),
    MongooseModule.forFeature([{ name: Iot.name, schema: IotSchema }]),
  ],
  controllers: [IotController],
  providers: [IotService],
})
export class AppModule {}
