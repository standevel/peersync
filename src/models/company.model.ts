import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BaseModel } from './base.model';

export interface ICompany {
    companyName: string;
    address: string;
    email: string;
}

export type CompanyDocument = HydratedDocument<Company>;

@Schema({ timestamps: true })
export class Company extends BaseModel {
    @Prop() companyName: string;
    @Prop() address: string;
    @Prop({ required: true, unique: true }) email: string;
}
export const CompanySchema = SchemaFactory.createForClass(Company);
CompanySchema.set('toJSON', {
    // virtuals: true
    transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
    },
});
CompanySchema.index({ email: 1 }, { unique: true })
