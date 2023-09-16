/* eslint-disable prettier/prettier */
import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateWorkspaceDto {
    @IsArray()
    @IsOptional()
    teams: string[];
    @IsString() name: string;
    @IsBoolean()
    @IsOptional() isCompany: boolean;
    @IsString()
    @IsOptional() companyId: Types.ObjectId | string;
}
