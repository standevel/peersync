import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { MessageDto } from 'src/dto/message.dto';
import { Message } from 'src/models';
import { MessageReaction } from 'src/models/message_reaction';

@Injectable()
export class MessageService {
    constructor(@InjectModel(Message.name) private chatModel: Model<Message>) { }

    async findNewChannelMessages(id: string, userId) {
        return await this.chatModel.countDocuments({ channel: id, views: { $ne: userId } });
    }
    async addReaction(message: MessageDto, reaction: MessageReaction) {
        console.log('message and reaction: ', message.id, reaction);
        const found = await this.chatModel.findOne({ '_id': message.id },);
        console.log('found: ', found);
        if (found.reactions) found.reactions.push(reaction);
        else found.reactions = [reaction];
        (await found.save()).toJSON();
        //   await found.populate({
        //     path:'sender',
        //     model:'User',
        //     select:'-password'
        // })
        const populated = await this.chatModel.populate(found, [{
            path: 'sender',
            model: 'User',
            select: '-password'
        },
        {
            path: 'receiver',
            model: 'User',
            select: '-password'
        }, {
            path: 'channel',
            model: 'Channel',
            populate: {
                path: 'members',
                model: 'User',
                select: '-password'
            }
        }]);
        return populated.toJSON() as MessageDto;
    }
    async getChannelMessage(channelId: string, page: number, pageSize: number) {
        if (!channelId) throw new BadRequestException('you need channel id to get channel messages!');

        const messages = await this.chatModel.find({ channel: new Types.ObjectId(channelId) }).skip(page * pageSize).limit(pageSize).populate({
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
        return messages;
    }
    async createMessage(message: MessageDto) {
        delete message.id;
        const newMsg = new this.chatModel({
            ...message, sender: message.sender ? new Types.ObjectId(message.sender['id']) : null,
            channel: message.channel ? new Types.ObjectId(message.channel['id']) : null,
            receiver: message.receiver ? new Types.ObjectId(message.receiver['id']) : null
        });
        const saved = await newMsg.save();
        console.log('SAVED: ', saved);
        return this.findOne(saved.id);
    }
    async findOne(id: string) {
        console.log('founding message with id: ', id);
        const found = await this.chatModel.findOne({ _id: id })
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
                populate: {
                    path: 'members',
                    model: 'User',
                    select: '-password'
                }
            });
        return found.toJSON();
    }
}
