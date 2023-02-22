import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type IotDocument = Iot & Document;

@Schema({ strict: false, versionKey: false })
export class Iot {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ type: Map, of: String })
  information: Record<string, string>;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const IotSchema = SchemaFactory.createForClass(Iot);
