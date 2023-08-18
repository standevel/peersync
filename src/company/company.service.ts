/*
https://docs.nestjs.com/providers#services
*/

import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from 'src/dto';
import { CompanyDto } from 'src/dto/company.dto';
import { Company } from 'src/models';

@Injectable()
export class CompanyService {

    constructor(@InjectModel(Company.name) private readonly companyModel: Model<CompanyDto>) { }

    async createCompany(companyDto: CompanyDto) {
        const found = await this.companyModel.findOne({ email: companyDto.email });

        if (found) throw new ConflictException('company email already exist');
        const saved = await this.companyModel.create(companyDto);
        return saved.toJSON();
    } async getMyCompany(user: UserDto) {
        return await this.companyModel.find({ createdBy: user.id })
    }
}
