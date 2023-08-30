/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseModel } from './base.model';


@Schema({ timestamps: true })
export class Invitation extends BaseModel {
    // @Prop() workspaceId: string;
    // @Prop() workspace: string;
    // @Prop() token: string;
    // @Prop()
    // email: string;

    @Prop() workspaceId: string;
    @Prop() workspace: string;
    @Prop() token: string;

    @Prop() email: string;
}

export const InvitationSchema = SchemaFactory.createForClass(Invitation);

InvitationSchema.set('toJSON', {
    // virtuals: true
    transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
    },
});
