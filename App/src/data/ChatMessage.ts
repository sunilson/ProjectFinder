import { User } from './User';
export class ChatMessage {
    constructor(public message: string, public author: User, public sent: Date) {

    }
}