import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export interface ICall {
    title: string;
    channelId: string;
    schedule_start_time: Date;
    status: string;
}

export type CallDocument = HydratedDocument<Call>;

@Schema({ timestamps: true })
export class Call {
    @Prop() title: string;
    @Prop({ type: Types.ObjectId, ref: 'Channel' }) channel: string;
    @Prop() schedule_start_time: Date;
    @Prop() duration: string;
    @Prop() status: string;
}

export const CallSchema = SchemaFactory.createForClass(Call);
