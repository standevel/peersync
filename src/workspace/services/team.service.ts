/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/providers#services
*/

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from 'src/dto';
import { TeamDto } from 'src/dto/team.dto';
import { Team } from 'src/models';

@Injectable()
export class TeamService {

    constructor(
        @InjectModel(Team.name) private readonly teamModel: Model<TeamDto>,
    ) { }
    async addChannelToTeam(teamId: string | TeamDto, channelId: string) {
        return await this.teamModel.updateOne({ _id: teamId }, { $push: { channels: channelId } });
    }
    async createTeam(team: TeamDto, user: UserDto) {
        if (!team) throw new BadRequestException('Team is required');
        team.createdBy = user.id;
        team.members = [user.id];
        return await this.teamModel.create(team);
    }
    async batchCreateTeam(teams: TeamDto[], user: UserDto): Promise<TeamDto[]> {
        if (teams.length == 0) {
            throw new BadRequestException('Expects an array of teams');
        }
        const toSave = teams.map((team) => {
            return { ...team, createdBy: user.id, members: [user.id] };
        });
        const saved = await this.teamModel.create(toSave);
        return saved;
    }
    async getUserTeams(user: UserDto, workspaceId: string) {
        console.log('getting user teams');
        const userTeams = await this.teamModel.find({ workspaceId: workspaceId, members: user.id });
        // .populate(['channels']);
        return userTeams;
    }
}
