import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

class Position {
    x: number;
    y: number;
}
export interface IWhiteboardElement {
    name: string;
    url: string;
    call_id: string;
    timestamp: number;
    position: Position;
}

export type WhiteboardElementDocument = HydratedDocument<WhiteboardElement>;

@Schema({ timestamps: true })
export class WhiteboardElement {
    @Prop() type: string; // type of element. could be drawing, text, shape
    @Prop({ type: Types.ObjectId, ref: 'Whiteboard' }) Whiteboard_id: string;
    @Prop() content: string;
    @Prop(raw({ x: Number, y: Number })) position: Position;
}
export const WhiteboardElementSchema =
    SchemaFactory.createForClass(WhiteboardElement);
