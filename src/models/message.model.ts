import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export interface IMessage extends Document {
    content: string;
    user_id: string;
    channel_id: string;
    // Additional fields and methods
}

export type MessageDocument = HydratedDocument<Message>;

@Schema({ timestamps: true })
export class Message {
    @Prop() content: string;
    @Prop({ type: Types.ObjectId, ref: 'User' }) user_id: string;
    @Prop({ type: Types.ObjectId, ref: 'Channel' }) channel_id: string;
}
export const MessageSchema = SchemaFactory.createForClass(Message);
