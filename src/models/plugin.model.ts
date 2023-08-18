import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export interface IPlugin {
    name: string;
    description: string;
    author_id: string;
    version: string;
    compatibility: string;
    settings: string;
    category: string;
}


export type PluginDocument = HydratedDocument<Plugin>;

@Schema({ timestamps: true })
export class Plugin {
    @Prop() name: string;
    @Prop() description: string;
    @Prop({ type: Types.ObjectId, ref: 'User' }) author_id: string;
    @Prop() version: string;
    @Prop() compatibility: string;
    @Prop() settings: string;
    @Prop() category: string;
}

export const PluginSchema = SchemaFactory.createForClass(Plugin);
