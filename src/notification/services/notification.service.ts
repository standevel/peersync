/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/providers#services
*/

import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as handlebars from 'handlebars';
import { join } from 'path';

import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { InvitationDto } from 'src/dto/invitation.dto';
import { InvitationService } from './invitation.service';
import { TokenGeneratorService } from './token_generator.service';


@Injectable()
export class NotificationService {
    constructor(private readonly mailerService: MailerService,
        private readonly tokenGeneratorService: TokenGeneratorService,
        private configService: ConfigService,
        private invitationService: InvitationService
    ) { }
    async sendInvitationEmail(email: string | string[], workspaceName: string, invitedBy: string, workpsaceId: string) {
        if (Array.isArray(email)) {
            email.map(async (em: string) => {
                const invitation = { email: em, token: this.tokenGeneratorService.genToken(), workspaceId: workpsaceId, workspace: workspaceName, createdBy: invitedBy };
                const save = await this.invitationService.saveInvite(invitation);
                // console.log(' save: ', save);
                const templatePath = join(__dirname, '../templates', 'invitation.hbs');
                const template = handlebars.compile(fs.readFileSync(templatePath, 'utf-8'));


                const acceptInvitationLink = this.configService.get('BASE_BE_URI') + 'account/accept-invite?invite_token=' + invitation.token;
                const rejectInvitationLink = this.configService.get('BASE_BE_URI') + 'account/reject-invite?invite_token=' + invitation.token;

                const html = template({ workspaceName, invitedBy, acceptInvitationLink, rejectInvitationLink });

                const mailOptions: nodemailer.SendMailOptions = {
                    from: this.configService.get('EMAIL'),
                    to: em,
                    subject: this.configService.get('APP_NAME') + ' Workspace Invitation',
                    html: html,
                };

                const res = await this.mailerService.sendMail(mailOptions);
            });

            // const saved = await this.invitationService.saveInvites(invitations);

            // invitations.forEach(async (invitation) => {

            // console.log('email res: ', res);
            // });
        } else {
            const saved = await this.invitationService.saveInvite({ email: email, token: this.tokenGeneratorService.genToken(), workspaceId: workpsaceId, workspace: workspaceName, createdBy: invitedBy }
            );
            const templatePath = join(__dirname, '../templates', 'invitation.hbs');
            const template = handlebars.compile(fs.readFileSync(templatePath, 'utf-8'));


            const acceptInvitationLink = this.configService.get('BASE_BE_URI') + 'account/accept-invite?invite_token=' + saved.token;
            const rejectInvitationLink = this.configService.get('BASE_BE_URI') + 'account/reject-invite?invite_token=' + saved.token;

            const html = template({ workspaceName, invitedBy, acceptInvitationLink, rejectInvitationLink });

            const mailOptions: nodemailer.SendMailOptions = {
                from: this.configService.get('EMAIL'),
                to: email,
                subject: this.configService.get('APP_NAME') + ' Workspace Invitation',
                html: html,
            };

            const res = await this.mailerService.sendMail(mailOptions);
            // console.log('email res: ', res);
        }



        return { message: 'Invitation sent successfully' };


    }
    async sendEmaiVerification(email: string, name: string, verificationLink: string) {
        const subject = 'Account Verification';
        console.log('verificationLink: ', verificationLink);
        // Load and compile the Handlebars template
        const templatePath = join(__dirname, '../templates/account-verification.hbs');
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

