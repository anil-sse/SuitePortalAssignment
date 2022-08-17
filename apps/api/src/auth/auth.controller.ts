import {BadRequestException, Body, Controller, Post, UseGuards} from "@nestjs/common";
import {AuthRequest} from "./models/auth-request";
import {AuthGuard} from "@nestjs/passport";
import {AuthService} from "./auth.service";

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {
  }

  // @UseGuards(AuthGuard('local'))
  @Post('login')
  public async login(@Body() authRequest: AuthRequest) {
    const user = await this.authService.validateUser(authRequest.username, authRequest.password)
    return this.authService.login(user);
  }



}
