import {Injectable} from "@nestjs/common";

import * as low from 'lowdb';
import * as FileSync from 'lowdb/adapters/FileSync';
import {User} from "../users/models/user";

const adapter = new FileSync<User>('./db/users.json')
const db = low(adapter)

@Injectable()
export class DbUsersService {

  public get collection(): any {
    return db.get('admin');
  }

  async getByUsername(username: string): Promise<User> {
    return await this.collection.find( { username }).value();
  }
}
