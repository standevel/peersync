import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export interface File {
    user_id: string;
    name: string;
    url: string;
    size: number;
    mime_type: string;
    timestamp: number;
    message_id: string;
}

export type FileDocument = HydratedDocument<File>;

@Schema({ timestamps: true })
export class File {
    @Prop({ type: Types.ObjectId, ref: 'User' })
    user_id: string;
    @Prop({ type: Types.ObjectId, ref: 'Message' })
    message_id: string;
    @Prop() name: string;
    @Prop() url: string;
    @Prop() size: number;
    @Prop() mime_type: string;
    @Prop() timestamp: number;
}

export const FileSchema = SchemaFactory.createForClass(File);
