/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/providers#services
*/

import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as handlebars from 'handlebars';
import { join } from 'path';



@Injectable()
export class NotificationService {
    constructor(private readonly mailerService: MailerService) { }
    async sendEmaiVerification(email: string, name: string, verificationLink: string) {
        const subject = 'Account Verification';
        console.log('verificationLink: ', verificationLink);
        // Load and compile the Handlebars template
        const templatePath = join(__dirname, 'templates/account-verification.hbs');
        const templateSource = fs.readFileSync(templatePath, 'utf-8');
        const template = handlebars.compile(templateSource);

        const html = template({ name, verificationLink });

        const res = await this.mailerService.sendMail({
            to: email,
            subject,
            html,
        });
        return res;
    }
    // return await this.mailerService
    //     .sendMail({
    //         to: email, // list of receivers
    //         from: 'account@peersync.com', // sender address
    //         subject: 'You are welcome to PeerSync', // Subject line
    //         // text: 'welcome', // plaintext body
    //         template: 'account_verification.template.html',
    //         // html: '<b>welcome to Peer Sync. Please verify your email by clicking on the link below</b>', // HTML body content
    //     })
    //     .then((res) => {

    //         console.log('account verification email sent: ', res);
    //         return res;
    //     })
    //     .catch((err) => { console.log('account verification Error: ', err); });
}

