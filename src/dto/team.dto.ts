import { BaseDto } from './base.dto';
import { WorkspaceDto } from './workspace.dto';

export class TeamDto extends BaseDto {
    name: string;
    description: string;
    workspaceId: WorkspaceDto | string;
    id?: string;
}
