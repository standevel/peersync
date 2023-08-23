/* eslint-disable prettier/prettier */
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { BaseDto } from './base.dto';
import { UserDto } from './user.dto';
import { PartialType } from '@nestjs/mapped-types';

export class CompanyDto extends BaseDto {
    @IsString() companyName: string;

    @IsOptional()
    @IsString() address: string;

    @IsEmail()
    @IsOptional()
    email: string;

    @IsOptional()
    id?: string;

    @IsString() password: string;
    constructor(
        companyName: string,
        address: string,
        email: string,
        createdBy: UserDto | string,
        password: string
    ) {
        super();
        this.companyName = companyName;
        this.address = address;
        this.createdBy = createdBy;
        this.email = email;
        this.password = password;
    }
}


export class UpdateCompanyDto extends PartialType(CompanyDto) { }