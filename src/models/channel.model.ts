import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export interface IChannel {
    name: string;
    workspace_id: string;
    // Additional fields and methods
}

export type ChannelDocument = HydratedDocument<Channel>;

@Schema({ timestamps: true })
export class Channel {
    @Prop() name: string;
    @Prop() workspace_id: string;
}

export const ChannelSchema = SchemaFactory.createForClass(Channel);
