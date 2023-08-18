import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export interface ProfileVisibility {
    user_id: string;
    public_fields: string[];
    privacy_preference: string;
}

export type AvailabilityDocument = HydratedDocument<Availability>;

@Schema({ timestamps: true })
export class Availability {
    @Prop({ type: Types.ObjectId, ref: 'User' })
    user_id: string;
    @Prop([String]) public_fields: string[];
    @Prop() privacy_preference: string;
}

export const AvailabilitySchema = SchemaFactory.createForClass(Availability);
