/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { IsArray, IsOptional, IsString } from "class-validator";

export class WorkspaceDto {
    @IsString()
    name: string;
    @IsString() description: string;
    @IsOptional()
    @IsArray() teams: string[];
    @IsOptional()
    @IsArray() members: string[];
    @IsString()
    @IsOptional() companyId: string;
    @IsString() createdBy: string;
    @IsOptional() id?: string;
}
export class UpdateWorkspaceDto extends PartialType(WorkspaceDto) { }