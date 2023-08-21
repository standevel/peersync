/* eslint-disable prettier/prettier */
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
    @IsOptional() @IsString() avatar?: string;
    @IsOptional() @IsArray() workspaces?: string[];
    @IsOptional() @IsString() phone?: string;
    @IsOptional() @IsBoolean() phone_is_verified?: boolean;
    @IsOptional() @IsBoolean() email_is_verified?: boolean;
    @IsArray()
    @IsOptional() id?: string;
}
