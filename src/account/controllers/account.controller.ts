/* eslint-disable prettier/prettier */
/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Param, Patch, Post, Query, Render, Res } from '@nestjs/common';
import { Response, response } from 'express';
import { SignInDto, UpdateUserDto, UserDto } from 'src/dto';
import { Public } from 'src/is_public';
import { AccountService } from '../services/account.service';
import { UserService } from '../services/user.service';
import { GetUser } from 'src/decorators/get-user.decorator';

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

        if (user) {
            await this.userService.updateUserVerificationStatus(user.id);

            return { status: user.isEmailVerified, name: user.name, redirectUrl: 'https://workspace-hrsn.onrender.com/#/login' };
        } else {
            return { status: false, name: '', redirectUrl: '' };
        }
    }

    @Public()
    @Render('accept_invite')
    @Get('accept-invite')
    acceptInvite(@Query('invite_token') token: string) {
        console.log(' token: ', token);
        return this.accountService.acceptInvite(token);
    }

    @Public()
    @Get('reject-invite')
    rejectInvite(@Query('invite_token') token: string) {
        console.log(' token: ', token);
    }

    @Public()
    @Post('accept-success/:token')
    acceptSuccess(@Body() personalData: UpdateUserDto, @Param('token') token: string,) {
        console.log('update data: ', personalData, token);
        // const response = await 
        return this.accountService.acceptSuccess(token, personalData);
        // console.log('respose: ', response);
    }

}
