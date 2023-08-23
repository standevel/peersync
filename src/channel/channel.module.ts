/* eslint-disable prettier/prettier */
import { ChannelController } from './controllers/channel.controller';
import { ChannelService } from './services/channel.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Channel, ChannelSchema } from 'src/models';

@Module({
    imports: [MongooseModule.forFeature([{ name: Channel.name, schema: ChannelSchema }])],
    controllers: [
        ChannelController,],
    providers: [
        ChannelService,],
    exports: [ChannelService]
})
export class ChannelModule { }
