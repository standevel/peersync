import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export interface IThreadMessage {
    thread_id: string;
    user_id: string;
    content: string;
    timestamp: number;
    attatchments: string[];
}

export type ThreadMessageDocument = HydratedDocument<ThreadMessage>;

@Schema({ timestamps: true })
export class ThreadMessage {
    @Prop({ type: Types.ObjectId, ref: 'Thread' }) thread_id: string;
    @Prop({ type: Types.ObjectId, ref: 'User' }) user_id: string;
    @Prop() content: string;
    @Prop() timestamp: number;
    @Prop([String]) attatchments: string[];
}

export const UserPluginSchema = SchemaFactory.createForClass(ThreadMessage);
