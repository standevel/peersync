/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Post } from '@nestjs/common';
import { CompanyService } from './company.service';
import { GetUser } from 'src/decorators/get-user.decorator';
import { UserDto } from 'src/dto';
import { CompanyDto } from 'src/dto/company.dto';

@Controller('company')
export class CompanyController {
    constructor(private companyService: CompanyService) { }
    @Get()
    getMyCompany(@GetUser() user: UserDto) {
        return this.companyService.getMyCompany(user);
    }

    @Post()
    createCompany(@Body() company: CompanyDto, @GetUser() user: UserDto) {
        company.createdBy = user.id;
        return this.companyService.createCompany(company);
    }
}
