/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { IsArray, IsOptional, IsString } from 'class-validator';
import { BaseDto } from './base.dto';
import { WorkspaceDto } from './workspace.dto';

export class TeamDto extends BaseDto {
    @IsString() name: string;
    @IsString() description: string;
    @IsString() workspaceId: WorkspaceDto | string;
    @IsString()
    @IsOptional() id?: string;
    @IsArray()
    @IsOptional() channels: string[];
    @IsArray()
    @IsOptional() members: string[];
}

export class UpdateTeamDto extends PartialType(TeamDto) { }