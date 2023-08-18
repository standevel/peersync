import { IsArray, IsBoolean, IsString, IsEmail, IsOptional } from 'class-validator';
export class UserDto {
    @IsString() name: string;
    @IsEmail() email: string;
    @IsString() password: string;
    @IsString() avatar: string;
    @IsArray() workspaces: string[];
    @IsString() phone: string;
    @IsBoolean() phone_is_verified: boolean;
    @IsBoolean() email_is_verified: boolean;
    @IsOptional() id: string;
}
