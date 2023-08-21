/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Post } from '@nestjs/common';
import { NotificationService } from '../services/notification.service';
import { Public } from 'src/is_public';

@Controller('notification')
export class NotificationController {
    constructor(private notificatinService: NotificationService) { }
    @Public()
    @Post('send-account-email')
    sendAccountVerification(@Body() body: { email: string; }) {
        return this.notificatinService.sendEmaiVerification(body.email, 'Stanley', 'http://192.168.0.152:3000/api/v1/account/verify-email');
    }
}
