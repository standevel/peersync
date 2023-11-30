/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/websockets/gateways#gateways
*/

import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageDto } from 'src/dto/message.dto';
import { EVENT, EventPayloadDto, EventType } from 'src/enum/event_type.enum';
import { MessageService } from 'src/message/services/message.service';
// import {Socket} from '@nestjs/platform-socket.io';
@WebSocketGateway({
    namespace: 'chat',
    cors: {
        origin: '*',
    },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
    constructor(private messageService: MessageService) { }
    @WebSocketServer()
    server: Server;

    users = new Map<string, Socket[]>();

    @SubscribeMessage(EVENT)
    handleEvent(@MessageBody() payload: EventPayloadDto, @ConnectedSocket() socket: Socket) {
        // this.server.emit('events', data);
        console.log('event payload: ', payload);
        switch (payload.type) {
            case EventType.JOIN_CHANNEL:
                this.joinChannel(socket, payload.data);
                break;
            case EventType.JOIN_CHANNELS:
                this.joinChannels(socket, payload.data);
                break;
            case EventType.NEW_MESSAGE:
                this.handleMessage(socket, payload.data);
                break;
            case EventType.GET_CHANNEL_MESSAGES:
                this.getChannelMessages(socket, payload.data);
                break;
            default:
                break;
        }
    }
    async getChannelMessages(socket: Socket, params: { channelId: string, page: number, pageSize: number; }) {
        try {
            const messages = await this.messageService.getChannelMessage(params.channelId, params.page, params.pageSize);
            const payload = new EventPayloadDto();
            payload.type = EventType.GET_CHANNEL_MESSAGES,
                payload.data = messages;
            console.log('channel messages: ', payload);
            this.server.to(params.channelId).emit(EVENT, payload);
        } catch (error) {
            console.log('Error getting channel messages: ', error);
        }
    }
    joinChannels(socket: Socket, channels: string[]) {
        console.log('channels: ', channels);
        channels.forEach(channel => {
            socket.join(channel);
        });
        setTimeout(() => {
            console.log('socket rooms: ', socket.rooms);
        }, 1000);
        const payload = new EventPayloadDto();
        payload.type = EventType.READ_STATUS;
        payload.data = 'confirming connection with backend';
        socket.emit(EVENT, payload);
    }
    joinChannel(socket, data: any) {
        console.log(' join channel data: ', data);
    }

    handleConnection(client: Socket, ...args: any[]) {
        console.log('User connected: ', client.id);
        var query = client.handshake.query;
        console.log('query: ', query);
        if (query.userId) {
            this.addUserSocket(client, query.userId.toString(),);
        }
        console.log('online users: ', this.users);
        const payload = new EventPayloadDto();
        payload.type = EventType.READ_STATUS;
        payload.data = 'confirming connection with backend';
        client.emit(EVENT, payload);
    }

    handleDisconnect(client: Socket) {
        console.log('disconnecting socket: ', client.id);
        for (const [key, values] of this.users.entries()) {

            const index = values.indexOf(client);
            if (index !== -1) {
                values.splice(index, 1);

                if (values.length === 0) {
                    this.users.delete(key);
                }
            }
        }
    }
    async handleMessage(socket: Socket, message: MessageDto) {
        try {
            console.log('message: ', message);
            const payload = {
                type: EventType.NEW_MESSAGE,
                data: message
            };
            if (message.isPrivate) {
                var userSocketIds = this.getUserSocketIds(message.receiver['id']);

                this.server.to(userSocketIds).emit(EVENT, payload);

            } else {
                this.server.to(message.channel['id']).emit(EVENT, payload);
            }

            const savedMsg = await this.messageService.createMessage(message);
            console.log('saved message: ', savedMsg);
        } catch (error) {
            console.log('Error creating message');
        }
    }
    getUserSocketIds(userId: string) {
        const sockets = this.users.get(userId);
        return sockets?.map(socket => socket.id);
    }
    addUserSocket(socket: Socket, userId: string) {
        try {
            if (this.users.has(userId)) {
                if (!this.users.get(userId).find(sockt => sockt.id == socket.id))
                    this.users.get(userId).push(socket);
            } else {
                this.users.set(userId, [socket]);
            }
        } catch (error) {
            console.log('error adding user socket: ', error);
        }
    }

    afterInit(server: any) {
        console.log('Socket is live');
    }

}
