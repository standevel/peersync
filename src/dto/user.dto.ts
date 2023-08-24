/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { Roles } from '../decorators/roles.decorator';
import {
    IsArray,
    IsBoolean,
    IsEmail,
    IsOptional,
    IsString,
} from 'class-validator';
export class UserDto {
    @IsString() name: string;
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
    @IsArray() roles: string[];
    @IsString()
    @IsOptional() id?: string;

}

export class UpdateUserDto extends PartialType(UserDto) { }
