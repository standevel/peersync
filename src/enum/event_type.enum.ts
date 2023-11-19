export enum EventType {
    JOIN_CHANNEL = 'JOIN_CHANNEL',
    LEAVE_CHANNEL = 'LEAVE_CHANNEL',
    NEW_MESSAGE = 'NEW_MESSAGE',
    READ_STATUS = 'READ_STATUS',
    MAKE_CHANNEL_ADMIN = 'MAKE_CHANNEL_ADMIN',
    MAKE_TEAM_ADMIN = 'MAKE_TEAM_ADMIN'
}

export class EventPayloadDto {
    type: EventType;
    data: any;
}