import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Configuration extends Document {
  @Prop({ required: true })
  androidVersion: string;

  @Prop({ required: true })
  webVersion: string;

  @Prop({ required: true })
  dateTime: Date;
}

export const ConfigurationSchema = SchemaFactory.createForClass(Configuration);
