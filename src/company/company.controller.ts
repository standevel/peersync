/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Post } from '@nestjs/common';
import { GetUser } from 'src/decorators/get-user.decorator';
import { UserDto } from 'src/dto';
import { CompanyDto } from 'src/dto/company.dto';
import { CompanyService } from './company.service';
import { Public } from 'src/is_public';

@Controller('company')
export class CompanyController {
    constructor(private companyService: CompanyService) { }
    @Get()
    getMyCompany(@GetUser() user: UserDto) {
        return this.companyService.getMyCompany(user);
    }

    @Public()
    @Post()
    createCompany(@Body() company: CompanyDto) {
        return this.companyService.createCompany(company);
    }
}
