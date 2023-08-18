import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Company, CompanySchema } from 'src/models';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }]),
    ],
    controllers: [CompanyController],
    providers: [CompanyService],
    exports: [CompanyService]
})
export class CompanyModule { }
