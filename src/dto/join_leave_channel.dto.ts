import { IsString } from 'class-validator';

export class JoinLeaveChannelDto {
    @IsString() channelId: string;
    @IsString() userId: string;
}