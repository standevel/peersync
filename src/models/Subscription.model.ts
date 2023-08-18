import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export interface ISubscription {
    company_id: string;
    plan_id: string;
    start_date: Date;
    end_date: Date;
}

export type SubscriptionDocument = HydratedDocument<Subscription>;

@Schema({ timestamps: true })
export class Subscription {
    @Prop({ type: Types.ObjectId, ref: 'Company' }) company_id: string;
    @Prop({ type: Types.ObjectId, ref: 'Plan' }) plan_id: string;
    @Prop({ type: Date }) start_date: Date;
    @Prop({ type: Date }) end_date: Date;
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
