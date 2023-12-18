/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/decorators/get-user.decorator';
import { CreateWorkspaceDto, UserDto } from 'src/dto';

import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/decorators/roles.guard';
import { UserRole } from 'src/enum/user-roles.enum';
import { WorkspaceService } from '../services/workspace.service';

@Controller('workspace')// Specify required roles here
@UseGuards(RolesGuard)
export class WorkspaceController {
    constructor(private workspaceService: WorkspaceService) { }

    @Post()
    @Roles(UserRole.COMPANY_ADMIN)
    createWorkspace(
        @Body() createWorkspaceDto: CreateWorkspaceDto,
        @GetUser() user: UserDto,
    ) {
        // console.log('create workspace: ', createWorkspaceDto, ' user: ', user);
        return this.workspaceService.createWorkspace(createWorkspaceDto, user);
    }
    @Post('invite-teammate')
    inviteTeammate(@Body() data: { teammates: string[]; workspace: string; workspaceId: string; }, @GetUser() user: UserDto) {
        return this.workspaceService.InviteTeammate(data.teammates, user, data.workspace, data.workspaceId);
    }
    @Get('user-workspaces')
    getUserWorkspaces(@GetUser() user: UserDto) {
        return this.workspaceService.getUserWorkspaces(user.id);
    }
}
