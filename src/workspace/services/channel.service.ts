/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/providers#services
*/

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UserDto } from 'src/dto';
import { ChannelDto, UpdateChannelDto } from 'src/dto/channel.dto';
import { Channel } from 'src/models';
import { TeamService } from 'src/workspace/services/team.service';

@Injectable()
export class ChannelService {

    constructor(@InjectModel(Channel.name) private readonly channelModel: Model<ChannelDto>, private teamService: TeamService) { }
    async findAllInWorkspace(workspaceId: string) {
        return await this.channelModel.find({ workspaceId: new Types.ObjectId(workspaceId) });
    }
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
            if (!channel.createdBy) channel.createdBy = user.id;

            const saved = await this.channelModel.create(channel);
            await this.teamService.addChannelToTeam(saved.teamId, saved.id);
            return saved;
        } catch (error) {
            throw error;
        }
    }
}
