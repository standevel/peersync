import { IsOptional, IsString } from "class-validator";

export class WorkspaceDto {
    @IsString()
    name: string;
    @IsString() description: string;
    @IsString() teams: string[];
    @IsString()
    @IsOptional() companyId: string
    @IsString() createdBy: string;
    @IsOptional() id?: string;
}
