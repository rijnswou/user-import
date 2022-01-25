import { Injectable } from '@angular/core';
import { Observable, of, timer } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';

export enum RoleTypeEnum {
  student = 'STUDENT',
  teacher = 'TEACHER'
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Role {
  id: string;
  userId: string;
  roleType: RoleTypeEnum;
}

export interface Portfolio {
  id: string;
  userId: string;
}

@Injectable({
  providedIn: 'root'
})
export class MockApiService {

  constructor() { }

  createUser(name: string, email: string): Observable<User> {

    // convert info to match user interface
    return of(this.getUser(name, email))
    .pipe(
      delay(150+Math.random()*100), // mimic api delay
      map((newUser: User) => {

        // check if a name is present
        if(!newUser.name){
          throw Error('Voer een naam in')
        }

        // mimic checking for duplicate email
        if(newUser.email === 'jurgen@reconcept.nl'){
          throw Error('Het e-mailadres is al in gebruik')
        }

        // or return new user
        return newUser;

      })
    )

  }

  createRole(forUserId: string, roleType: RoleTypeEnum): Observable<Role> {

    // convert info to match user interface
    return of(this.getRole(forUserId, roleType))
    .pipe(
      delay(150+Math.random()*100), // mimic api delay
      map((newRole: Role) => {

        // check if the type is good
        if(newRole.roleType !== 'STUDENT' && newRole.roleType !== 'TEACHER'){
          throw Error('De opgegeven rol is niet bekend')
        }

        // or return new role
        return newRole;

      })
    )

  }

  createPortfolio(forUserId: string): Observable<Portfolio> {

    // convert info to match user interface
    return of(this.getPortfolio(forUserId))
    .pipe(
      delay(150+Math.random()*100), // mimic api delay
      map((newPortfolio: Portfolio) => {

        // or return new role
        return newPortfolio;

      })
    )

  }

  private getUser(name: string, email: string): User {

    return {

      // generate a random id
      id: uuidv4(),

      // set name
      name: name,

      // set email
      email: email

    }

  }

  private getRole(forUserId: string, roleType: RoleTypeEnum): Role {

    return {

      // generate a random id
      id: uuidv4(),

      // set userId
      userId: forUserId,

      // set type
      roleType: roleType

    }

  }

  private getPortfolio(forUserId: string): Portfolio {

    return {

      // generate a random id
      id: uuidv4(),

      // set userId
      userId: forUserId

    }

  }

}
