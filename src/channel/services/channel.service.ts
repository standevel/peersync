/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/providers#services
*/

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from 'src/dto';
import { ChannelDto, UpdateChannelDto } from 'src/dto/channel.dto';
import { Channel } from 'src/models';

@Injectable()
export class ChannelService {
    constructor(@InjectModel(Channel.name) private readonly channelModel: Model<ChannelDto>) { }

    async updateChannel(channel: UpdateChannelDto, channelId: string) {
        try {
            if (!channelId) throw new BadRequestException('Channel id is required to update channel data');
            const up = await this.channelModel.updateOne({ _id: channelId }, channel);
            if (up.modifiedCount) return { message: `${channel.name} update successful` };
            return { message: 'Failed to update channel ' + channel.name };
        } catch (error) {
            throw error;
        }
    }
    async createChannel(channel: ChannelDto, user: UserDto) {
        try {
            if (!channel.createdBy) channel.createdBy = user;

            return await this.channelModel.create(channel);
        } catch (error) {
            throw error;
        }
    }
}
