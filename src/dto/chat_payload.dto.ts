import { IsObject, IsString } from 'class-validator';

export class ChatPayload<T> {
    @IsString() type: string;
    @IsObject() data: T;
}