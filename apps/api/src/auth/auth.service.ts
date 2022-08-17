import {Injectable} from "@nestjs/common";
import {UsersService} from "../users/users.service";
import {User} from "../users/models/user";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
    ) {
  }

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.usersService.findByUsername(username);
    if (user && user.password === password) {
      const {password,  ...result} = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = {username: user.username, sub: user.uuid}
    const accessToken = this.jwtService.sign(payload);
    return {username: user.username, accessToken: accessToken};
  }
}
