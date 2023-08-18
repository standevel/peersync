import { IsEmail, IsOptional, IsString } from 'class-validator';
import { BaseDto } from './base.dto';
import { UserDto } from './user.dto';

export class CompanyDto extends BaseDto {
    @IsString() companyName: string;
    @IsString() address: string;
    @IsEmail()
    @IsOptional()
    @IsOptional()
    id?: string;
    email: string;
    constructor(
        companyName: string,
        address: string,
        email: string,
        createdBy: UserDto | string,
    ) {
        super();
        this.companyName = companyName;
        this.address = address;
        this.createdBy = createdBy;
        this.email = email;
    }
}
