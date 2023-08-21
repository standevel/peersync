/* eslint-disable prettier/prettier */
import { WorkspaceController } from './controllers/workspace.controller';
import { WorkspaceService } from './services/workspace.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyModule } from 'src/company/company.module';
import { Team, TeamSchema, Workspace, WorkspaceSchema } from 'src/models';
import { TeamController } from './controllers/team.controller';
import { TeamService } from './services/team.service';
import { AccountModule } from 'src/account/account.module';

@Module({
    imports: [
        CompanyModule, AccountModule,
        MongooseModule.forFeature([
            { name: Workspace.name, schema: WorkspaceSchema },
            { name: Team.name, schema: TeamSchema },
        ]),
    ],
    controllers: [WorkspaceController, TeamController],
    providers: [WorkspaceService, TeamService],
})
export class WorkspaceModule { }
