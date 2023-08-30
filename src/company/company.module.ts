/* eslint-disable prettier/prettier */
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountModule } from 'src/account/account.module';
import { Company, CompanySchema } from 'src/models';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
    imports: [
        AccountModule, NotificationModule,
        MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }]),
    ],
    controllers: [CompanyController],
    providers: [CompanyService],
    exports: [CompanyService]
})
export class CompanyModule { }
