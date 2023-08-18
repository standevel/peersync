import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export interface IUserPlugin {
    user_id: string;
    plugin_id: string;
    installation_status: string;
    installation_date: Date;
}

export type UserPluginDocument = HydratedDocument<UserPlugin>;

@Schema({ timestamps: true })
export class UserPlugin {
    @Prop({ type: Types.ObjectId, ref: 'User' }) user_id: string;
    @Prop({ type: Types.ObjectId, ref: 'Plugin' }) plugin_id: string;
    @Prop() installation_status: string;
    @Prop() installation_date: Date;
}

export const UserPluginSchema = SchemaFactory.createForClass(UserPlugin);
