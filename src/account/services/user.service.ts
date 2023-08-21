/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, Type } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UserDto } from 'src/dto';
import { User } from 'src/models';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDto>) { }
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
