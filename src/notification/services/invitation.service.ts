/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InvitationDto } from 'src/dto/invitation.dto';
import { Invitation } from 'src/models/invitation.model';

@Injectable()
export class InvitationService {

    constructor(@InjectModel(Invitation.name) private readonly invitationModel: Model<InvitationDto>,
    ) { }
    async findByToken(token: string) {
        return (await this.invitationModel.findOne({ token }))?.toJSON();
    }
    async saveInvite(invitation: InvitationDto) {
        return await this.invitationModel.create(invitation);
    }
    async saveInvites(invitations: InvitationDto[]) {
        console.log('invitations: ', invitations);

        const saved = await this.invitationModel.create({ ...invitations });
        console.log(' saved: ', saved);
        return saved;
    }
    async deleteByToken(token: string): Promise<any> {
        return await this.invitationModel.deleteOne({ token });
    }
}
