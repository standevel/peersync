import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export interface Recording {
    call_id: string;
    file_id: string;
}

export type RecordingDocument = HydratedDocument<Recording>;

@Schema({ timestamps: true })
export class Recording {
    @Prop({ type: Types.ObjectId, ref: 'User' })
    call_id: string;
    @Prop({ type: Types.ObjectId, ref: 'File' })
    file_id: string;
}

export const RecordingSchema = SchemaFactory.createForClass(Recording);
