/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { TeamDto } from 'src/dto';
import { BaseModel } from './base.model';

export interface IChannel {
    name: string;
    workspaceId: string;
    description: string;
    teamId: string | TeamDto;
}

export type ChannelDocument = HydratedDocument<Channel>;

@Schema({ timestamps: true })
export class Channel extends BaseModel {
    @Prop() name: string;
    @Prop({ type: Types.ObjectId, ref: "Workspace" }) workspaceId: Types.ObjectId;
    @Prop() description: string;
    @Prop({ type: Types.ObjectId, ref: "Team" }) teamId: Types.ObjectId;
}

export const ChannelSchema = SchemaFactory.createForClass(Channel);
ChannelSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
    },
});
