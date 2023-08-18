/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Post } from '@nestjs/common';
import { GetUser } from 'src/decorators/get-user.decorator';
import { CreateWorkspaceDto, UserDto } from 'src/dto';

import { WorkspaceService } from '../services/workspace.service';

@Controller('workspace')
export class WorkspaceController {
    constructor(private workspaceService: WorkspaceService) { }

    @Post()
    createWorkspace(
        @Body() createWorkspaceDto: CreateWorkspaceDto,
        @GetUser() user: UserDto,
    ) {
        // console.log('create workspace: ', createWorkspaceDto, ' user: ', user);
        return this.workspaceService.createWorkspace(createWorkspaceDto, user);
    }
}
