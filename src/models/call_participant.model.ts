import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export interface ICallParticipant {
    callId: string;
    userId: string;
    role: string;
    joinTime: string;
}

export type CallParticipantDocument = HydratedDocument<CallParticipant>;

@Schema({ timestamps: true })
export class CallParticipant {
    @Prop({ type: Types.ObjectId, ref: 'Call' }) callId: string;
    @Prop({ type: Types.ObjectId, ref: 'User' }) userId: string;
    @Prop() role: string;
    @Prop() joinTime: string;
}

export const CallParticipantSchema =
    SchemaFactory.createForClass(CallParticipant);
