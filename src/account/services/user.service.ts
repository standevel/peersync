/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, Type } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UpdateUserDto, UserDto } from 'src/dto';
import { User } from 'src/models';

@Injectable()
export class UserService {


    constructor(@InjectModel(User.name) private userModel: Model<UserDto>) { }
    async changeActiveWorkspace(workspaceId: string, userId: string) {
        return await this.userModel.updateOne({ _id: userId }, { activeWorkspace: workspaceId });
    }
    async findById(userId: string) {
        return await this.userModel.findById(userId);
    }
    acceptSuccess(personalData: UpdateUserDto) {
        throw new Error('Method not implemented.');
    }
    async addWorkspaceToUser(userId: Types.ObjectId | string, workspaceId: Types.ObjectId | string) {
        const upRes = await this.userModel.updateOne(
            { _id: userId },
            { $push: { workspaces: workspaceId } },
        );
        console.log('update Res: ', upRes);
    }
    async verifyUser(token: string): Promise<UserDto | null> {
        return (await this.userModel.findOne({ emailVerificationToken: token }))?.toJSON();
    }

    async updateUserVerificationStatus(userId: string): Promise<void> {
        await this.userModel.updateOne({ _id: userId }, { isEmailVerified: true }).exec();
    }
}
