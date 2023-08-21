/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UserService } from 'src/account/services/user.service';
import { CompanyService } from 'src/company/company.service';
import { CreateWorkspaceDto, TeamDto, UserDto, WorkspaceDto } from 'src/dto';
import { CompanyDto } from 'src/dto/company.dto';
import { Workspace } from 'src/models';
import { TeamService } from './team.service';

@Injectable()
export class WorkspaceService {
    constructor(
        @InjectModel(Workspace.name)
        private readonly workspaceModel: Model<WorkspaceDto>,
        private teamService: TeamService,
        private companyService: CompanyService,
        private userService: UserService
    ) { }
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
                name: createDto.workspace,
                createdBy: new Types.ObjectId(user.id),
                companyId: createDto.isCompany ? new Types.ObjectId(createDto.companyId) : null
            });
            workspace = workspace.toJSON();
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
            }
            await this.workspaceModel.updateOne({ _id: workspace.id }, workspace);
            return workspace;
        } catch (error) {
            console.log('Error: ', error.message);
            throw error;
        }
    }

    async addUserToWorkspace(userId: Types.ObjectId | string, workspaceId: Types.ObjectId | string) {
        await this.workspaceModel.updateOne(
            { _id: workspaceId },
            { $push: { users: userId } },
        );
    }
}
