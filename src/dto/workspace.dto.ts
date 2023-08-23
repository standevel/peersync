/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from "class-validator";

export class WorkspaceDto {
    @IsString()
    name: string;
    @IsString() description: string;
    @IsString() teams: string[];
    @IsString()
    @IsOptional() companyId: string;
    @IsString() createdBy: string;
    @IsOptional() id?: string;
}
export class UpdateWorkspaceDto extends PartialType(WorkspaceDto) { }