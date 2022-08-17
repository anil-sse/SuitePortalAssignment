import { Module } from '@nestjs/common';
import { MaintenanceRequestModule } from '../maintenance-request/maintenance-request.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import {AuthModule} from "../auth/auth.module";
import {UsersModule} from "../users/users.module";
import {DbUsersService} from "../shared-service/db-users.service";

@Module({
  imports: [MaintenanceRequestModule, AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
