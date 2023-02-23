import { Injectable, OnModuleInit } from '@nestjs/common';
import { Iot } from 'src/schemas/iot.schema';
import { IotService } from './iot.service';
import amqp from 'amqp-connection-manager';

@Injectable()
export class RabbitmqService implements OnModuleInit {
  private channel;
  private connection;

  constructor(private readonly iotService: IotService) {}

  async startQueue(device: Iot): Promise<void> {
    this.connection = amqp.connect('amqp://admin:admin@localhost:5672');
    this.channel = this.connection.createChannel();
    await this.channel.assertQueue('iot_queue');
    if (device !== null) {
      await this.channel.sendToQueue(
        'iot_queue',
        Buffer.from(JSON.stringify(device)),
      );
    }
  }

  async onModuleInit() {
    const connection = amqp.connect('amqp://admin:admin@localhost:5672');
    const channel = connection.createChannel();
    await channel.assertExchange('iot_exchange', 'direct');
    const queue = await channel.assertQueue('iot_queue');
    await channel.bindQueue(queue.queue, 'iot_exchange', 'iot_route');
    await channel.consume(queue.queue, async (msg) => {
      if (msg.content !== null) {
        const iotParsed = JSON.parse(msg.content.toString());
        const createDevice = await this.iotService.create(iotParsed);
        await channel.ack(msg);
        return createDevice;
      }
    });
  }
}
