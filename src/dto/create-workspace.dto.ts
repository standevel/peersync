import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateWorkspaceDto {
    @IsArray()
    @IsOptional()
    teams: string[];
    @IsString() workspace: string;
    @IsBoolean()
    @IsOptional() isCompany: boolean;
    @IsString() @IsOptional() companyName: string;
    @IsString() @IsOptional() companyEmail: string;
}
