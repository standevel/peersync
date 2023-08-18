import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export interface Availability {
    userId: string;
    start_time: Date;
    end_time: Date;
    is_recurring: boolean;
    status: string;
}

export type AvailabilityDocument = HydratedDocument<Availability>;

@Schema({ timestamps: true })
export class Availability {
    @Prop({ type: Types.ObjectId, ref: 'User' })
    @Prop()
    userId: string;
    @Prop() start_time: Date;
    @Prop() end_time: Date;
    @Prop() is_recurring: boolean;
    @Prop() status: string;
}

export const AvailabilitySchema = SchemaFactory.createForClass(Availability);
