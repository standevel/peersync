import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { MessageFile } from './message_file';
import { MessageReaction } from './message_reaction';


export type MessageDocument = HydratedDocument<Message>;

@Schema({ timestamps: true })
export class Message {
    @Prop() content: string;
    @Prop({ type: Types.ObjectId, ref: 'User' }) receiver: string;
    @Prop({ type: Types.ObjectId, ref: 'Channel' }) channel: string;
    @Prop({ type: Types.ObjectId, ref: 'User' }) sender: string;
    @Prop() files: MessageFile[];
    @Prop() reactions: MessageReaction[];
    @Prop({ type: [Types.ObjectId] }) mentions: string[];
    @Prop({ type: [Types.ObjectId] }) readBy: string[];
    @Prop() isPrivate: boolean;
}



export const MessageSchema = SchemaFactory.createForClass(Message);
MessageSchema.set('toJSON', {
    virtuals: true,
    transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
    },
});
