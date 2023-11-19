/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/websockets/gateways#gateways
*/

import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, ConnectedSocket } from '@nestjs/websockets';
import { EventPayloadDto, EventType } from 'src/enum/event_type.enum';
// import {Socket} from '@nestjs/platform-socket.io';
@WebSocketGateway({
    namespace: 'chat',
    cors: {
        origin: '*',
    },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {

    @WebSocketServer()
    server: any;

    @SubscribeMessage('message')
    handleEvent(@MessageBody() payload: EventPayloadDto,) {
        // this.server.emit('events', data);
        console.log('new message: ', payload);
        switch (payload.type) {
            case EventType.JOIN_CHANNEL:
                this.joinChannel(payload.data);
                break;

            default:
                break;
        }
    }
    joinChannel(data: any) {
        console.log(' join channel data: ', data);
    }

    handleConnection(client: any, ...args: any[]) {
        console.log('User connected');
    }

    handleDisconnect(client: any) {
        console.log('User disconnected');
    }

    afterInit(server: any) {
        console.log('Socket is live');
    }

}
