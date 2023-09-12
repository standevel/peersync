/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GetUser } from 'src/decorators/get-user.decorator';
import { UserDto } from 'src/dto';
import { TeamDto } from 'src/dto/team.dto';
import { TeamService } from '../services/team.service';

@Controller('team')
export class TeamController {
    constructor(private teamService: TeamService) { }

    @Post()
    createTeam(@Body() team: TeamDto, @GetUser() user: UserDto) {
        return this.teamService.createTeam(team, user);
    }
    @Post('create-many')
    batchCreate(@Body() teams: TeamDto[], @GetUser() user: UserDto) {
        return this.teamService.batchCreateTeam(teams, user);
    }
    @Get('user-teams/:workspaceId')
    getUserTeams(@GetUser() user: UserDto, @Param('workspaceId') workspaceId: string) {
        return this.teamService.getUserTeams(user, workspaceId);
    }
}
