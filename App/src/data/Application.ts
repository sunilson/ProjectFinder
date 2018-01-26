import { User } from './User';
import { LoginService } from './../services/login-service';
import { Project } from './Project';
export class Application {
    constructor(public message: string,
        public projectId: string,
        public authorId: string,
        public status?: number,
        public author?: User,
        public id?: string,
        public project?: Project) {

    }
}