/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { BaseModel } from './base.model';

export type WorkspaceDocument = HydratedDocument<Workspace>;

@Schema({ timestamps: true })
export class Workspace extends BaseModel {
    @Prop() name: string;
    @Prop() description: string;
    @Prop({ type: [Types.ObjectId], ref: 'Team' }) teams: Types.ObjectId[];
    @Prop({ type: Types.ObjectId, ref: 'Company' }) companyId: Types.ObjectId;
    @Prop({ type: [Types.ObjectId], ref: 'User' }) members: Types.ObjectId[];
}
export const WorkspaceSchema = SchemaFactory.createForClass(Workspace);
WorkspaceSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
    },
});
