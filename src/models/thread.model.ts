import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export interface IThread {
    message_id: string;
    date_created: Date;
}

export type ThreadDocument = HydratedDocument<Thread>;

@Schema({ timestamps: true })
export class Thread {
    @Prop({ type: Types.ObjectId, ref: 'Message' }) message_id: string;
    @Prop() date_created: Date;
}

export const UserPluginSchema = SchemaFactory.createForClass(Thread);
