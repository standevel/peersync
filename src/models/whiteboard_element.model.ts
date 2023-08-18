import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export interface IWhiteboard {
    name: string;
    url: string;
    call_id: string;
    timestamp: number;
}

export type WhiteboardDocument = HydratedDocument<Whiteboard>;

@Schema({ timestamps: true })
export class Whiteboard {
    @Prop() name: string;
    @Prop({ type: Types.ObjectId, ref: 'Call' }) call_id: string;
    @Prop() timestamp: number;
}
export const WhiteboardSchema = SchemaFactory.createForClass(Whiteboard);
