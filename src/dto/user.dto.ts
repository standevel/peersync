/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import {
    IsArray,
    IsBoolean,
    IsEmail,
    IsOptional,
    IsString,
} from 'class-validator';
import { WorkspaceDto } from './workspace.dto';
export class UserDto {
    @IsString()
    @IsOptional() name: string;
    @IsString() firstName: string;
    @IsString() lastName: string;
    @IsEmail() email: string;
    @IsString() password: string;
    @IsOptional()
    @IsString() avatar?: string;
    @IsOptional()
    @IsArray() workspaces?: string[];
    @IsOptional()
    @IsString() phone?: string;
    @IsOptional()
    @IsBoolean() isPhoneVerified?: boolean;
    @IsOptional()
    @IsBoolean() isEmailVerified?: boolean;
    @IsString()
    @IsOptional() emailVerificationToken: string;
    @IsArray()
    @IsOptional() roles: string[];
    @IsString()
    @IsOptional() id?: string;
    @IsString()
    @IsOptional() activeWorkspace?: string | WorkspaceDto;

    @IsString()
    @IsOptional() profileImageUrl?: string;

}

export class UpdateUserDto extends PartialType(UserDto) { }
