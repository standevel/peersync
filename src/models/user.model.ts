/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types, Document } from 'mongoose';

export interface IUser {
    name: string;
    email: string;
    password: string;
    avatar: string;
    workspaces: string[];
    roles: string[];
    phone: string;
    phone_is_verified: string;
    email_is_verified: string;
}

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
    @Prop() name: string;
    @Prop({ unique: true }) email: string;
    @Prop() password: string;
    @Prop() avatar: string;
    @Prop({ type: [Types.ObjectId], ref: 'Workspace' })
    workspaces: Types.ObjectId[];
    @Prop() phone: string;
    @Prop() roles: string[];
    @Prop() isPhoneVerified?: boolean;
    @Prop() isEmailVerified?: boolean;
    @Prop() emailVerificationToken: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.set('toJSON', {
    // virtuals: true
    transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
    },
});
UserSchema.index({ email: 1 }, { unique: true });
