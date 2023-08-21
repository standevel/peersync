import { Prop } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export class BaseModel {
    @Prop({ type: Types.ObjectId, ref: 'User' }) createdBy: Types.ObjectId;
}
