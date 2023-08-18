import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IMessage, Message } from 'src/models';

@Injectable()
export class MessageService {
    constructor(@InjectModel(Message.name) private catModel: Model<Message>) { }
    async createMessage(message: IMessage) {
        // will create message here
    }
}
