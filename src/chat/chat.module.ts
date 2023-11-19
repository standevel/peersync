/* eslint-disable prettier/prettier */
import { ChatController } from './chat.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';

@Module({
    imports: [],
    controllers: [ChatController,],
    providers: [ChatGateway, ChatService],
})
export class ChatModule { }
