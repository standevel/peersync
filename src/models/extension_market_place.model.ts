import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export interface IExtensionMarketPlace {
    name: string;
    description: string;
    author_id: string;
    version: string;
    compatibility: string;
    settings: string;
    featured_plugins: string[];
    categories: string;
    ratings: string;
}

export type ExtensionMarketPlaceDocument =
    HydratedDocument<ExtensionMarketPlace>;

@Schema({ timestamps: true })
export class ExtensionMarketPlace {
    @Prop() name: string;
    @Prop() description: string;
    @Prop() author_id: string;
    @Prop() version: string;
    @Prop() compatibility: string;
    @Prop() settings: string;
    @Prop([String]) featured_plugins: string[];
    @Prop([String]) categories: string[];
    @Prop([Number]) ratings: number[];
}

export const ExtensionMarketPlaceSchema =
    SchemaFactory.createForClass(ExtensionMarketPlace);
