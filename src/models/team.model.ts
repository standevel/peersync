/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseModel } from './base.model';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Team extends BaseModel {
    @Prop() name: string;
    @Prop() description: string;
    @Prop({ type: Types.ObjectId, ref: 'Workspace' }) workspaceId: string;
    @Prop({ type: [Types.ObjectId], ref: 'User' }) members: string[];
    @Prop({ type: [Types.ObjectId], ref: 'Channel' }) channels: string[];
}

export const TeamSchema = SchemaFactory.createForClass(Team);
TeamSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
    },
});
