import { User } from '../domain/User';
import { Wallet } from '../domain/Wallet';

import { Injectable } from '@tsed/di';
import { EntityRepository, FindManyOptions, Repository  } from 'typeorm';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    Create(user: Partial<User>) : Promise<User> {
        return this.save(user);
    }

    ReadAll() : Promise<User[]>{
       return this.find({
          relations: ['wallet'],
        });
    }

    GetByEmail( email: string):Promise<User | undefined> {
      return this.findOne({
        relations: ['wallet'],
        where: { email },
      });
    }

    GetById(id: string) : Promise<User | undefined> {
      return this.findOne({
        relations: ['wallet'],
        where: { id },
      });
    }

    async Delete(user : User) {
      await this.delete(user);
  }

  GetOthers(userId: string) : Promise<User[] | undefined> {
    const otherUsers = this.createQueryBuilder("User") .where("User.id <> :id", { id: userId }).getMany()
    return otherUsers;
  }

  async Update(id: string, user: Partial<User>) {
    this.update(id, user);
  }
  
}