import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export interface INotificationSetting {
    user_id: string;
    is_paused: boolean;
    play_sound: boolean;
    channels: Array<string>;
}

export type NotificationSettingDocument = HydratedDocument<NotificationSetting>;

@Schema({ timestamps: true })
export class NotificationSetting {
    @Prop({ type: Types.ObjectId, ref: 'User' }) user_id: string;
    @Prop()
    is_paused: boolean;
    @Prop() play_sound: boolean;
    @Prop([String]) channels: string[];
}

export const NotificationSettingSchema =
    SchemaFactory.createForClass(NotificationSetting);
