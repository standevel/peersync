/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { GetUser } from 'src/decorators/get-user.decorator';
import { UserDto } from 'src/dto';
import { ChannelDto, UpdateChannelDto } from 'src/dto/channel.dto';
import { ChannelService } from '../services/channel.service';

@Controller('channel')
export class ChannelController {
    constructor(private channelService: ChannelService) { }

    @Post()
    createChannel(@Body() channel: ChannelDto, @GetUser() user: UserDto) {
        return this.channelService.createChannel(channel, user);
    }
    @Put('/:channelId')
    updateChannel(@Body() channel: UpdateChannelDto, @Param('channelId') channelId: string) {
        return this.channelService.updateChannel(channel, channelId);
    }
}
