import { Module } from '@nestjs/common';
import { AppController } from './controller/app.controller';
import { AppService } from './services/app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Iot, IotSchema } from './schemas/iot.schema';

const mongoUrl: string =
  process.env.MONGO_DB || 'mongodb://localhost:27017/iot-dev';

@Module({
  imports: [
    MongooseModule.forRoot(mongoUrl),
    MongooseModule.forFeature([{ name: Iot.name, schema: IotSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
