import {Module} from "@nestjs/common";
import {UsersService} from "./users.service";
import {DbUsersService} from "../shared-service/db-users.service";

@Module({
  exports: [UsersService, DbUsersService],
  providers: [UsersService, DbUsersService]
})
export class UsersModule {}
