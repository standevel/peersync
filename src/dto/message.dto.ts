import { IsArray, IsJSON, IsObject, IsOptional, IsString } from 'class-validator';
import { MessageFile } from 'src/models/message_file';
import { MessageReaction } from 'src/models/message_reaction';
import { UserDto } from './user.dto';
import { ChannelDto } from './channel.dto';

export class MessageDto {
    @IsString() content: string;
    @IsObject() receiver: string | UserDto;

    @IsObject()
    @IsOptional() channel: string | ChannelDto;

    @IsObject()
    @IsOptional() sender: string | UserDto;

    @IsObject()
    @IsOptional() files: MessageFile[];

    @IsObject()
    @IsOptional() ractions: MessageReaction[];

    @IsArray()
    @IsOptional() mentions: string[];

    @IsArray()
    @IsOptional() readBy: string[];
    @IsString()
    isPrivate: boolean;
}