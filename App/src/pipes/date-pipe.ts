import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({ name: 'formatDate' })
export class DatePipe implements PipeTransform {

    transform(value: string, args: string[]): any {
        if (!value) return value;
        let date = moment(value);
        return date.utc().format("DD.MM.YYYY");
    }

}