/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export interface IMembership extends Document {
    user_id: string;
    workspace_id: string;
    // Additional fields and methods
}

export type MembershipDocument = HydratedDocument<Membership>;

@Schema({ timestamps: true })
export class Membership {
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    user_id: string;
    @Prop({ type: Types.ObjectId, ref: 'Workspace', required: true })
    workspace_id: string;
    // Additional fields
}

export const MembershipSchema = SchemaFactory.createForClass(Membership);
