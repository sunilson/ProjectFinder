import { Location } from './Location';
import { User } from './User';
import { Payment } from './Payment';
import { Application } from './Application';
import { Tag } from './Tag';
import moment from 'moment';

export class Project {

    constructor(public title: string,
        public description: string,
        public payment: Payment,
        public tags: Tag[],
        public maxMemberAmount: Number,
        public startDate: string,
        public endDate: string,
        public status: number,
        public author?: User,
        public location?: Location,
        public applications?: Application[],
        public id?: string,
        public members?: User[],
        public memberAmount?: Number,
        public local?: boolean) {
    }

    public formatDate(): string {
        let momentDate = moment(this.startDate);
        return momentDate.format();
    }

}