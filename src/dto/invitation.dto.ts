/* eslint-disable prettier/prettier */
import { IsEmail, IsString } from 'class-validator';
import { BaseDto } from './base.dto';

export class InvitationDto extends BaseDto {
    @IsString() workspaceId: string;
    @IsString() workspace: string;
    @IsString() token: string;
    @IsString()
    @IsEmail() email: string;
}