import {Injectable} from "@nestjs/common";
import {DbUsersService} from "../shared-service/db-users.service";
import {User} from "./models/user";

@Injectable()
export class UsersService {

  constructor(private dbUserService: DbUsersService) {
  }

  async findByUsername(username: string): Promise<User> {
    return this.dbUserService.getByUsername(username);
  }

}
