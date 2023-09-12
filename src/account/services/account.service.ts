/* eslint-disable prettier/prettier */
import {
    BadRequestException,
    ConflictException,
    Injectable,
    UnauthorizedException
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';
import { SignInDto, UserDto } from 'src/dto';
import { UserRole } from 'src/enum/user-roles.enum';
import { User } from 'src/models';
import { InvitationService } from 'src/notification/services/invitation.service';
import { UpdateUserDto } from '../../dto/user.dto';
import { NotificationService } from '../../notification/services/notification.service';
import { TokenGeneratorService } from '../../notification/services/token_generator.service';

@Injectable()
export class AccountService {



    constructor(
        private notificationService: NotificationService,
        @InjectModel(User.name) private readonly userModel: Model<UserDto>,
        private jwtService: JwtService,
        private configService: ConfigService,
        private tokenGeneratorService: TokenGeneratorService,
        private invitationService: InvitationService
    ) { } async getAllUsers() {
        return await this.userModel.find();
    }
   

    async acceptInvite(token: string) {
        if (!token) throw new BadRequestException('Token must be provided');
        const invite = await this.invitationService.findByToken(token);
        if (!invite) throw new BadRequestException('Invalid token');
        return { token: token, email: invite.email, workspaceId: invite.workspaceId, link: this.configService.get('BASE_BE_URI') + 'account/accept-success/' + token };
    }
    async acceptSuccess(token: string, userData: UpdateUserDto) {
        try {
            const invite = await this.invitationService.findByToken(token);
            const loginUri = this.configService.get('BASE_FE_URI') + '#/login';
            console.log('login Url: ', loginUri);
            let user = await this.userModel.findOne({ email: userData.email });
            if (user) {
                user.workspaces.push(invite.workspaceId);
                // await user.updateOne();
                this.invitationService.deleteByToken(token);
                return { id: user.id, email: user.email, loginUri: loginUri };
            }
            else {
                console.log('creating user');
                user = await this.userModel.create({ email: invite.email, password: await this.hassPassword(userData.password), workspaces: [invite.workspaceId], emailVerificationToken: invite.token, isEmailVerified: true, roles: ['user'], });
                // this.invitationService.deleteByToken(token);
                return { id: user.id, email: user.email, loginUri };
            }
        } catch (error) {
            console.log('error: ', error);
            throw error;
        }
    }
    async hassPassword(password: string) {
        return await bcrypt.hash(password, 10);
    }
    async signUp(createUserDto: UserDto) {
        try {
            console.log('user data: ', createUserDto);

            await this.emailExist(createUserDto.email);

            const token = this.tokenGeneratorService.genToken();
            const user = (
                await this.userModel.create({ ...createUserDto, roles: [UserRole.COMPANY_ADMIN], emailVerificationToken: token, password: await this.hassPassword(createUserDto.password) })
            ).toJSON();
            if (user) {

                const link = this.configService.get('BASE_BE_URI') + 'account/verify-email/' + token;
                console.log('verification link: ', link);

                this.notificationService.sendEmaiVerification(user.email, user.name, link);

                return await this.signIn({
                    email: createUserDto.email,
                    password: createUserDto.password,
                });
            }
        } catch (error) {
            console.log('Error: ', error.message);
            throw error;
        }
    }
    async verifiyEmail(token: string) {
        const user = await this.userModel.findOne({ email_token: token });
    }

    async signIn(signinDto: SignInDto) {
        // console.log('signIn dto: ', signinDto);
        const found =
            (await (await this.userModel.findOne({ email: signinDto.email })).populate([
                {
                    path: 'workspaces', model: 'Workspace',
                    populate: {
                        path: 'teams', model: "Team",
                        populate: { path: 'members', model: 'User' }
                    }
                }]))?.toJSON();

        // console.log('found: ', found);
        if (!found) throw new UnauthorizedException('Invalid email or password');
        const isMatch = bcrypt.compareSync(signinDto.password, found.password);
        if (!isMatch) throw new UnauthorizedException('Invalid email or password!');

        console.log('found user: ', found._id);
        // usr name and password is valid
        const { workspaces, password, ...payload } = found;
        return {
            access_token: this.jwtService.sign(payload),
            user: { ...payload, workspaces },
        };
    }
    async findUserByEmail(email: string) {
        return (await this.userModel.findOne({ email }))?.toJSON();
    }
    async emailExist(email: string) {
        if (!email) {
            throw new BadRequestException('Email is required');
        }
        const found = await this.userModel.findOne({ email });
        if (found) {
            throw new ConflictException(
                'User with the email ' + email + ' already exist',
            );
        }
        return { exist: false };
    }
}
