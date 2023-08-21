/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/providers#services
*/

import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AccountService } from 'src/account/services/account.service';
import { UserDto } from 'src/dto';
import { CompanyDto } from 'src/dto/company.dto';
import { Company } from 'src/models';

@Injectable()
export class CompanyService {

    constructor(
        private accountService: AccountService,
        @InjectModel(Company.name) private readonly companyModel: Model<CompanyDto>) { }

    async createCompany(companyDto: CompanyDto) {
        const found = await this.companyModel.findOne({ email: companyDto.email });

        if (found) throw new ConflictException('company email already exist');

        const foundUser = await this.accountService.findUserByEmail(companyDto.email);
        if (foundUser) {
            companyDto.createdBy = foundUser.id;
            const res = await this.accountService.signIn({ email: companyDto.email, password: companyDto.password });
            const saved = await this.companyModel.create(companyDto);
            return { ...res, company: saved.toJSON() };
        } else {
            const token = this.accountService.genToken();
            const result = await this.accountService.signUp({
                email: companyDto.email, password: companyDto.password, name: companyDto.companyName, emailVerificationToken: token
            });
            companyDto.createdBy = result.user['id'].toString() ?? result.user['_id'].toString();
            const saved = await this.companyModel.create(companyDto);
            return { ...result, company: saved.toJSON() };
        }


    } async getMyCompany(user: UserDto) {
        return await this.companyModel.find({ createdBy: user.id });
    }
}
