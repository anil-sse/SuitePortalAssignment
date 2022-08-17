import { Injectable } from '@nestjs/common';
import { MaintenanceRequest } from '@suiteportal/api-interfaces';
import * as low from 'lowdb';
import * as FileSync from 'lowdb/adapters/FileSync';
import * as nanoid from 'nanoid';

export interface MaintenanceRequestDB extends MaintenanceRequest {
  id: string;
  submittedAt: Date;

  isClosed: boolean;
  closedAt?: Date;
}

/**
export interface MaintenanceRequestDBUpdate extends MaintenanceRequestDB {
  isClosed: boolean;
  closedAt: Date;
}
*/

export interface Pagination{
  total: number;
  perPage: number;
  offset: number;
  rows: any[];
}


const adapter = new FileSync<MaintenanceRequestDB>('./db/maint-requests.json')
const db = low(adapter)

db.defaults({ requests: [] }).write();

@Injectable()
export class MaintenanceRequestDao {

  private get collection(): any {
    return db.get('requests');
  }

  constructor() {
    //
  }

  async insertNewRequest(maintenanceRequest: MaintenanceRequest) {
    const id = { id: nanoid.nanoid(10) };
    await this.collection
      .push({
        ...id,
        ...maintenanceRequest,
        submittedAt: new Date(),

        // @addition properties
        isClosed: false,
        closedAt: null
      })
      .write()
    return id;
  }

  async getMaintenanceRequest(id: string): Promise<MaintenanceRequestDB> {
    return await this.collection.find({ id }).value();
  }

  async closeMaintenanceRequest(id:string): Promise<MaintenanceRequestDB> {
    return this.collection.find({id: id}).assign(
      {
        isClosed: true,
        closedAt: new Date()
      }
    ).write();
  }

  async getAllMaintenanceRequest(): Promise<MaintenanceRequestDB[]> {
    return await this.collection.value().sort((a, b) => {
      // @ts-ignore
      return new Date(b.submittedAt) - new Date(a.submittedAt);
    });
    // return await this.collection.value();
  }
}
