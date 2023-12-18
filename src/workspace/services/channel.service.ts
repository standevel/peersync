/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/providers#services
*/

import { BadRequestException, Injectable, UseInterceptors } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UserService } from 'src/account/services/user.service';
import { UserDto } from 'src/dto';
import { ChannelDto, UpdateChannelDto } from 'src/dto/channel.dto';
import { MessageService } from 'src/message/services/message.service';
import { Channel } from 'src/models';
import { TeamService } from 'src/workspace/services/team.service';

@Injectable()
export class ChannelService {


    constructor(private userService: UserService, private messageService: MessageService,
        @InjectModel(Channel.name) private readonly channelModel: Model<ChannelDto>, private teamService: TeamService) { }
    async findAllInWorkspace(workspaceId: string, userId: string) {
        const channels = await this.channelModel.find({ workspaceId: new Types.ObjectId(workspaceId) }).populate([
            {
                path: 'members',
                model: 'User',
                select: '-password'
            }
        ]);
        const formattedChannels = [];
        for (let i = 0; i < channels.length; i++) {
            const newMessages = await this.messageService.findNewChannelMessages(channels[i].id, userId);
            formattedChannels.push({ ...channels[i].toJSON(), newMessages: newMessages > 0 ? newMessages : newMessages });
        }
        // console.log('formatted channels: ', formattedChannels);
        return formattedChannels;
    }
    async getUserChannels(userId: string) {
        const user = await this.userService.findById(userId);
        const channels = await this.channelModel.find({ members: userId });
        const formattedChannels = [];
        for (let i = 0; i < channels.length; i++) {
            const newMessages = await this.messageService.findNewChannelMessages(channels[i].id, userId);
            formattedChannels.push({ ...channels[i].toJSON(), newMessages: newMessages > 0 ? newMessages : 1 });
        }
        // console.log('formatted channels: ', formattedChannels);
        return formattedChannels;
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
