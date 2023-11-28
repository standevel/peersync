import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { MessageDto } from 'src/dto/message.dto';
import { Message } from 'src/models';

@Injectable()
export class MessageService {
    constructor(@InjectModel(Message.name) private chatModel: Model<Message>) { }
    async createMessage(message: MessageDto) {
        message.channel;
        const newMsg = new this.chatModel({
            message, sender: message.sender ? new Types.ObjectId(message.sender['id']) : null,
            channel: message.channel ? new Types.ObjectId(message.channel['id']) : null,
            receiver: message.receiver ? new Types.ObjectId(message.receiver['id']) : null
        });
        await newMsg.save();
        return this.findOne(newMsg.id);
    }
    async findOne(id: string) {
        return await this.chatModel.findOne({ _id: id })
            .populate({
                path: 'sender',
                model: 'User',
                select: '-teams'
            })
            .populate({
                path: 'receiver',
                model: 'User',
                select: '-teams'
            })
            .populate({
                path: 'channel',
                model: 'Channel',
                select: '-members -teamId'
            });
    }
}
