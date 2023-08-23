/* eslint-disable prettier/prettier */
import {
    BadRequestException,
    ConflictException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';
import { SignInDto, UserDto } from 'src/dto';
import { User } from 'src/models';
import { NotificationService } from '../../notification/services/notification.service';

@Injectable()
export class AccountService {


    constructor(
        private notificationService: NotificationService,
        @InjectModel(User.name) private readonly userModel: Model<UserDto>,
        private jwtService: JwtService,
        private configService: ConfigService
    ) { } async getAllUsers() {
        return await this.userModel.find();
    }
    genToken() {
        const token = Math.random().toString(32).replace('.', '');
        return token;
    }
    async signUp(createUserDto: UserDto) {
        try {
            console.log('user data: ', createUserDto);

            await this.emailExist(createUserDto.email);
            const hash = await bcrypt.hash(createUserDto.password, 10);
            const token = this.genToken();
            const user = (
                await this.userModel.create({ ...createUserDto, emailVerificationToken: token, password: hash })
            ).toJSON();
            if (user) {

                const link = this.configService.get('BASE_URI') + 'account/verify-email/' + token;
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
        const found = (
            await this.userModel.findOne({ email: signinDto.email })
        ).toJSON();
        // console.log('found: ', found);
        if (!found) throw new UnauthorizedException('Invalid email or password');
        const isMatch = bcrypt.compareSync(signinDto.password, found.password);
        if (!isMatch) throw new UnauthorizedException('Invalid email or password!');

        console.log('found user: ', found._id);
        // usr name and password is valid
        const { password, ...payload } = found;
        return {
            access_token: this.jwtService.sign(payload),
            user: payload,
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
