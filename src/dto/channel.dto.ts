/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { IsArray, IsOptional, IsString } from 'class-validator';
import { BaseDto } from './base.dto';
import { TeamDto } from './team.dto';

export class ChannelDto extends BaseDto {
    @IsString() name: string;
    @IsString() workspaceId: string;
    @IsString() description: string;
    @IsString()
    @IsOptional() teamId?: string | TeamDto;
    @IsString()
    @IsOptional() id?: string;

    @IsArray()
    @IsOptional()
    members?: string[];
}


export class UpdateChannelDto extends PartialType(ChannelDto) { }