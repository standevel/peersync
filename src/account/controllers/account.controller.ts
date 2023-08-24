/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Param, Post, Query, Render, Res } from '@nestjs/common';
import { Response } from 'express';
import { SignInDto, UserDto } from 'src/dto';
import { Public } from 'src/is_public';
import { AccountService } from '../services/account.service';
import { UserService } from '../services/user.service';

@Controller('account')
export class AccountController {
    constructor(private accountService: AccountService, private userService: UserService) { }
    @Public()
    @Post()
    signUp(@Body() createUserDto: UserDto) {
        return this.accountService.signUp(createUserDto);
    }
    @Public()
    @Post('signin')
    async signIn(@Body() createUserDto: SignInDto, @Res() res: Response) {
        return res.status(200).json(await this.accountService.signIn(createUserDto));
    }
    @Public()
    @Get('check-email-exist')
    checkEmailExist(@Query('email') email: string) {
        console.log('email: ', email);

        return this.accountService.emailExist(email);
    }
    @Get()
    getAllUsers() {
        return this.accountService.getAllUsers();
    }

    @Public()
    @Render('email_verification')
    @Get('verify-email/:token')
    async verifyUser(@Param('token') token: string, @Res() res: Response): Promise<{ status: boolean, name: string; redirectUrl: string; }> {
        const user = await this.userService.verifyUser(token);
        console.log('token: ', token, 'user: ', user);
        // if (!user) {
        //     return 'User not found';
        // }

        // if (user.isEmailVerified) {
        // res.render('email_verification', { status: user.isEmailVerified,name:user.name });
        // }
        if (user) {

            await this.userService.updateUserVerificationStatus(user.id);

            return { status: user.isEmailVerified, name: user.name, redirectUrl: 'https://workspace-hrsn.onrender.com/#/login' };
        } else {

            // await this.userService.updateUserVerificationStatus(user.id);

            return { status: false, name: '', redirectUrl: '' };
        }
    }
}
