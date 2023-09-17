/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UserService } from 'src/account/services/user.service';
import { CreateWorkspaceDto, TeamDto, UserDto, WorkspaceDto } from 'src/dto';
import { Workspace } from 'src/models';
import { ChannelService } from 'src/workspace/services/channel.service';
import { NotificationService } from '../../notification/services/notification.service';
import { TeamService } from './team.service';

@Injectable()
export class WorkspaceService {

    constructor(
        @InjectModel(Workspace.name)
        private readonly workspaceModel: Model<WorkspaceDto>,
        private teamService: TeamService,
        private channelService: ChannelService,
        private userService: UserService,
        private notificationService: NotificationService
    ) { }
    async InviteTeammate(teammates: string[], user: UserDto, workspace: string, workspaceId: string) {

        const name = user.firstName ? user.firstName + " " + user.lastName : user.name;
        return this.notificationService.sendInvitationEmail(teammates, workspace, name, workspaceId);
    }
    async createWorkspace(createDto: CreateWorkspaceDto, user: UserDto) {
        try {
            let workspace;
            // if (createDto.isCompany) {
            //     const company = new CompanyDto(
            //         createDto.companyName,
            //         '',
            //         createDto.companyEmail,
            //         user,
            //     );
            // const savedCompany = await this.companyService.createCompany(company);
            // workspace = await this.workspaceModel.create({
            //         name: createDto.workspace,
            //         createdBy: new Types.ObjectId(user.id),
            //         companyId: savedCompany.id,
            //     });
            //     workspace = workspace.toJSON();

            //     this.userService.addWorkspaceToUser(user.id, workspace.id);
            //     this.addUserToWorkspace(user.id, workspace.id);
            // } else {
            workspace = await this.workspaceModel.create({
                name: createDto.name,
                createdBy: new Types.ObjectId(user.id),
                // users: [new Types.ObjectId(user.id)],
                companyId: createDto.isCompany ? new Types.ObjectId(createDto.companyId) : null
            });
            workspace = workspace.toJSON();

            // create default general channel for the workspace
            await this.channelService.createChannel({ name: 'General Channel', description: 'general channel for everyone in the workspace', createdBy: user.id, workspaceId: workspace.id }, user);
            this.userService.addWorkspaceToUser(user.id, new Types.ObjectId(workspace.id));
            this.addUserToWorkspace(new Types.ObjectId(user.id), workspace.id);
            // }
            console.log('workspace: ', workspace);
            const teams: TeamDto[] = createDto.teams.map((team: any) => {
                const teamDto = new TeamDto();
                teamDto.createdBy = user.id;
                teamDto.name = team;
                teamDto.workspaceId = workspace.id;
                return teamDto;
            });
            const savedTeams = await this.teamService.batchCreateTeam(teams, user);
            for (let i = 0; i < savedTeams.length; i++) {
                workspace.teams.push(savedTeams[i]['id']);
                this.channelService.createChannel({
                    name: 'General Channel',
                    description: 'general channel for everyone in the team',
                    createdBy: user.id,
                    workspaceId: workspace.id, teamId: savedTeams[i]
                }, user);
            }
            await this.workspaceModel.updateOne({ _id: workspace.id }, workspace);
            return workspace;
        } catch (error) {
            console.log('Error: ', error.message);
            throw error;
        }
    }

    async addUserToWorkspace(userId: Types.ObjectId | string, workspaceId: Types.ObjectId | string) {
        console.log('adding user to workspace: ', userId, workspaceId);
        await this.workspaceModel.updateOne(
            { _id: workspaceId },
            { $push: { users: userId } },
        );
    }
}
