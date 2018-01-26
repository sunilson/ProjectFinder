import { Project } from './Project';
import { Application } from './Application';
import { Tag } from './Tag';
export class User {
    constructor(public username: string,
        public email: string,
        public password: string,
        public firstname: string,
        public lastname: string,
        public profilepicture?: string,
        public tags?: Tag[],
        public id?: string,
        public applications?: Application[],
        public ownProjects?: Project[],
        public memberProjects?: Project[],
        public local?: Boolean
    ) {

    }
}