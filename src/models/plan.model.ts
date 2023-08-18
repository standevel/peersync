import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export interface ISubscription {
    name: string;
    price: string;
    features: string[];
    description: string;
    constraint: Array<{ name: string; max_users: number; max_duration: number }>;
}

export type SubscriptionDocument = HydratedDocument<Subscription>;

@Schema({ timestamps: true })
export class Subscription {
    @Prop() name: string;
    @Prop() price: string;
    @Prop([String]) features: string[];
    @Prop() description: string;
    @Prop(
        raw({
            name: String,
            max_users: Number,
            max_duration: Number,
        }),
    )
    constraint: Array<{ name: string; max_users: number; max_duration: number }>;
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
