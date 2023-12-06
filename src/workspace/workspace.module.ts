/* eslint-disable prettier/prettier */
import { WorkspaceController } from './controllers/workspace.controller';
import { WorkspaceService } from './services/workspace.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountModule } from 'src/account/account.module';
import { CompanyModule } from 'src/company/company.module';
import { Channel, ChannelSchema, Team, TeamSchema, Workspace, WorkspaceSchema } from 'src/models';
import { NotificationModule } from 'src/notification/notification.module';
import { TeamController } from './controllers/team.controller';
import { TeamService } from './services/team.service';
import { ChannelController } from './controllers/channel.controller';
import { ChannelService } from './services/channel.service';

@Module({
    imports: [
        CompanyModule, AccountModule,
        NotificationModule,
        MongooseModule.forFeature([
            { name: Workspace.name, schema: WorkspaceSchema },
            { name: Team.name, schema: TeamSchema },
            { name: Channel.name, schema: ChannelSchema },
        ]),
    ],
    controllers: [WorkspaceController, TeamController, ChannelController],
    providers: [WorkspaceService, TeamService, ChannelService],
    exports: [WorkspaceService, ChannelService]
})
export class WorkspaceModule { }
